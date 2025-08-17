import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  Rating,
  TextField,
  Snackbar
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Layout from '../components/Layout';
import orderApi from '../../infrastructure/api/orderApi';

/**
 * OrderComplete page component
 * @returns {JSX.Element} OrderComplete page
 */
const OrderComplete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch order details on component mount
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await orderApi.getOrderById(id);
        setOrder(orderData);
        
        // Redirect if order is not in READY status
        if (orderData.status !== 'READY') {
          setSnackbarMessage('This order cannot be completed at this time.');
          setSnackbarOpen(true);
          setTimeout(() => {
            navigate(`/orders/${id}`);
          }, 2000);
        }
      } catch (err) {
        setError('Failed to load order details. Please try again later.');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, navigate]);

  // Handle complete order submission
  const handleCompleteOrder = async () => {
    setSubmitting(true);
    try {
      // Update order status to COMPLETED
      await orderApi.updateOrderStatus(id, 'COMPLETED');
      
      // Show success message
      setSnackbarMessage('Order completed successfully!');
      setSnackbarOpen(true);
      
      // Redirect to order history after a delay
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (err) {
      setError('Failed to complete order. Please try again.');
      console.error('Error completing order:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 2 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(`/orders/${id}`)}
          sx={{ mb: 2 }}
        >
          Back to Order
        </Button>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Complete Your Order
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : order ? (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h5">
              Ready to Complete Order #{order.id}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ my: 3 }}>
            <Typography variant="body1" paragraph>
              Please confirm that you have received your order and are satisfied with it.
              Your feedback helps us improve our service.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              How would you rate your experience?
            </Typography>
            <Rating
              name="order-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
              sx={{ my: 1 }}
            />
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Additional feedback (optional):
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us about your experience..."
              variant="outlined"
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/orders/${id}`)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCompleteOrder}
              disabled={submitting}
              sx={{ minWidth: 150 }}
            >
              {submitting ? <CircularProgress size={24} /> : 'Complete Order'}
            </Button>
          </Box>
        </Paper>
      ) : (
        <Alert severity="error">
          Order not found.
        </Alert>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Layout>
  );
};

export default OrderComplete;