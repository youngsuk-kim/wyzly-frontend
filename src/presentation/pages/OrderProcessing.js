import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Alert,
  Divider,
  Grid,
  Container
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import Layout from '../components/Layout';
import orderApi from '../../infrastructure/api/orderApi';

/**
 * OrderProcessing page component
 * Shows a processing state while order is being created in the background
 * @returns {JSX.Element} OrderProcessing page
 */
const OrderProcessing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  // Get order details from location state
  const orderDetails = location.state || {};
  
  useEffect(() => {
    // Check if there's an error stored in localStorage
    const storedError = localStorage.getItem('orderError');
    if (storedError) {
      setError(storedError);
      localStorage.removeItem('orderError');
    }
    
    // Simulate order completion after 2 seconds
    // In a real app, you might poll the backend to check order status
    const timer = setTimeout(() => {
      setOrderCompleted(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle continue shopping
  const handleContinueShopping = () => {
    navigate('/');
  };
  
  // Handle view orders
  const handleViewOrders = () => {
    navigate('/orders');
  };
  
  return (
    <Layout>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          {error ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
              <Typography variant="h5" gutterBottom>
                There was a problem with your order
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate(-1)}
                sx={{ mt: 2 }}
              >
                Go Back and Try Again
              </Button>
            </Box>
          ) : orderCompleted ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Order Processed Successfully!
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Your order is being prepared. Thank you for your purchase!
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Typography variant="body1">Box:</Typography>
                    <Typography variant="body1">Quantity:</Typography>
                    <Typography variant="body1">Price per box:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>Total:</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'left' }}>
                    <Typography variant="body1">{orderDetails.boxTitle || 'Box'}</Typography>
                    <Typography variant="body1">{orderDetails.quantity || 1}</Typography>
                    <Typography variant="body1">${orderDetails.boxPrice?.toFixed(2) || '0.00'}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                      ${orderDetails.totalPrice?.toFixed(2) || '0.00'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<HomeIcon />}
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<ShoppingBagIcon />}
                  onClick={handleViewOrders}
                >
                  View My Orders
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h4" gutterBottom>
                Processing Your Order
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please wait while we process your order...
              </Typography>
              
              <Box sx={{ my: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Order Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Typography variant="body1">Box:</Typography>
                    <Typography variant="body1">Quantity:</Typography>
                    <Typography variant="body1">Price per box:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>Total:</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'left' }}>
                    <Typography variant="body1">{orderDetails.boxTitle || 'Box'}</Typography>
                    <Typography variant="body1">{orderDetails.quantity || 1}</Typography>
                    <Typography variant="body1">${orderDetails.boxPrice?.toFixed(2) || '0.00'}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                      ${orderDetails.totalPrice?.toFixed(2) || '0.00'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default OrderProcessing;