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
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import Layout from '../components/Layout';
import orderApi from '../../infrastructure/api/orderApi';
import boxApi from '../../infrastructure/api/boxApi';

/**
 * OrderDetail page component
 * @returns {JSX.Element} OrderDetail page
 */
const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [box, setBox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Order status steps
  const orderSteps = [
    { label: 'Order Placed', description: 'Your order has been received' },
    { label: 'Processing', description: 'Your order is being prepared' },
    { label: 'Ready for Pickup', description: 'Your order is ready for pickup' },
    { label: 'Completed', description: 'Your order has been completed' }
  ];

  // Map order status to step index
  const getActiveStep = (status) => {
    switch (status) {
      case 'PENDING':
        return 0;
      case 'PROCESSING':
        return 1;
      case 'READY':
        return 2;
      case 'COMPLETED':
        return 3;
      case 'CANCELLED':
        return -1;
      default:
        return 0;
    }
  };

  // Fetch order details on component mount
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await orderApi.getOrderById(id);
        setOrder(orderData);
        
        // Fetch box details
        const boxData = await boxApi.getBoxById(orderData.boxId);
        setBox(boxData);
      } catch (err) {
        setError('Failed to load order details. Please try again later.');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Handle complete order button click
  const handleCompleteOrder = () => {
    navigate(`/orders/${id}/complete`);
  };

  // Render order status chip
  const renderOrderStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return <Chip label="Pending" color="primary" />;
      case 'PROCESSING':
        return <Chip label="Processing" color="info" icon={<LocalShippingIcon />} />;
      case 'READY':
        return <Chip label="Ready for Pickup" color="warning" icon={<InventoryIcon />} />;
      case 'COMPLETED':
        return <Chip label="Completed" color="success" icon={<CheckCircleIcon />} />;
      case 'CANCELLED':
        return <Chip label="Cancelled" color="error" />;
      default:
        return <Chip label={status} />;
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 2 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/orders')}
          sx={{ mb: 2 }}
        >
          Back to Orders
        </Button>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Order Details
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : order && box ? (
        <Grid container spacing={4}>
          {/* Order Summary */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2">
                  Order #{order.id}
                </Typography>
                {renderOrderStatus(order.status)}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Quantity:</strong> {order.quantity}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              {/* Order Status Stepper */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Status
                </Typography>
                
                {order.status === 'CANCELLED' ? (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    This order has been cancelled.
                  </Alert>
                ) : (
                  <Stepper activeStep={getActiveStep(order.status)} orientation="vertical">
                    {orderSteps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>
                          <Typography>{step.description}</Typography>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                )}
              </Box>
              
              {/* Complete Order Button - only show if order is ready for pickup */}
              {order.status === 'READY' && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCompleteOrder}
                  sx={{ mt: 3 }}
                >
                  Complete Order
                </Button>
              )}
            </Paper>
          </Grid>
          
          {/* Box Details */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={box.image}
                alt={box.title}
                sx={{ height: '200px', objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {box.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  This delicious box contains a variety of items from our restaurant.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${box.price.toFixed(2)} each
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => navigate(`/boxes/${box.id}`)}
                  >
                    View Box
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Alert severity="error">
          Order not found.
        </Alert>
      )}
    </Layout>
  );
};

export default OrderDetail;