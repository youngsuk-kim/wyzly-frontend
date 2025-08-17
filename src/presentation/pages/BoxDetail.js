import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  TextField,
  Divider,
  Paper,
  IconButton,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InventoryIcon from '@mui/icons-material/Inventory';
import Layout from '../components/Layout';
import boxApi from '../../infrastructure/api/boxApi';
import orderApi from '../../infrastructure/api/orderApi';

/**
 * BoxDetail page component
 * @returns {JSX.Element} BoxDetail page
 */
const BoxDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [box, setBox] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch box details on component mount
  useEffect(() => {
    const fetchBoxDetails = async () => {
      try {
        const data = await boxApi.getBoxById(id);
        setBox(data);
        // Initialize quantity to 1 or max available if less than 1
        setQuantity(data.quantity > 0 ? 1 : 0);
      } catch (err) {
        setError('Failed to load box details. Please try again later.');
        console.error('Error fetching box details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoxDetails();
  }, [id]);

  // Handle quantity change
  const handleQuantityChange = (value) => {
    if (value < 1) {
      setQuantity(1);
    } else if (box && value > box.quantity) {
      setQuantity(box.quantity);
    } else {
      setQuantity(value);
    }
  };

  // Handle order creation
  const handleCreateOrder = () => {
    if (!box || quantity < 1) return;

    // Set loading state and show immediate feedback
    setOrderLoading(true);
    setSnackbarMessage('Processing your order...');
    setSnackbarOpen(true);

    // Navigate to order processing page immediately
    navigate('/orders/processing', { 
      state: { 
        boxId: box.id.toString(), 
        quantity: quantity,
        boxTitle: box.title,
        boxPrice: box.price,
        totalPrice: box.price * quantity
      } 
    });

    // Process the order in the background
    orderApi.createOrder(box.id.toString(), quantity)
      .then(order => {
        // Order was successful, but user has already navigated away
        console.log('Order created successfully in background:', order);
      })
      .catch(err => {
        console.error('Error creating order in background:', err);
        // We could store this error in localStorage to show on the next page
        localStorage.setItem('orderError', 'Failed to create order. Please try again.');
      });
  };

  // Render stock status chip
  const renderStockStatus = (quantity) => {
    if (quantity > 10) {
      return <Chip label="In Stock" color="success" size="small" icon={<InventoryIcon />} />;
    } else if (quantity > 0) {
      return <Chip label={`Only ${quantity} left`} color="warning" size="small" icon={<InventoryIcon />} />;
    } else {
      return <Chip label="Out of Stock" color="error" size="small" icon={<InventoryIcon />} />;
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 2 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Back to Boxes
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : box ? (
        <Grid container spacing={4}>
          {/* Box Image */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={box.image}
                alt={box.title}
                sx={{ 
                  height: { xs: '300px', md: '400px' },
                  objectFit: 'cover'
                }}
              />
            </Card>
          </Grid>

          {/* Box Details */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ mb: 2 }}>
                {renderStockStatus(box.quantity)}
              </Box>

              <Typography variant="h4" component="h1" gutterBottom>
                {box.title}
              </Typography>

              <Typography variant="h5" color="primary" gutterBottom>
                ${box.price.toFixed(2)}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" paragraph>
                This delicious box contains a variety of items from our restaurant.
                Perfect for a quick meal or special occasion.
              </Typography>

              <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Availability:</strong> {box.quantity > 0 ? `${box.quantity} in stock` : 'Out of stock'}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Restaurant ID:</strong> {box.restaurantId}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Quantity Selector */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mr: 2 }}>
                  Quantity:
                </Typography>
                <IconButton 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || box.quantity === 0}
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      handleQuantityChange(value);
                    }
                  }}
                  inputProps={{ 
                    min: 1, 
                    max: box.quantity,
                    style: { textAlign: 'center' }
                  }}
                  disabled={box.quantity === 0}
                  sx={{ width: '60px', mx: 1 }}
                />
                <IconButton 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= box.quantity || box.quantity === 0}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </Box>

              {/* Order Button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={box.quantity === 0 || orderLoading}
                onClick={handleCreateOrder}
                sx={{ py: 1.5 }}
              >
                {orderLoading ? <CircularProgress size={24} /> : 'Place Order'}
              </Button>

              {box.quantity === 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  This item is currently out of stock.
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Alert severity="error">
          Box not found.
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

export default BoxDetail;
