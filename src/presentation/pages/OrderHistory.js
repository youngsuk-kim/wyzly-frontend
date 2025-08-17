import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Layout from '../components/Layout';
import orderApi from '../../infrastructure/api/orderApi';

/**
 * OrderHistory page component
 * @returns {JSX.Element} OrderHistory page
 */
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderApi.getOrdersWithBoxDetailsByUser();
        // Sort orders by date (newest first)
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(data);
      } catch (err) {
        setError('Failed to load orders. Please try again later.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle view order details
  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  // Render order status chip
  const renderOrderStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return <Chip label="Pending" color="primary" size="small" />;
      case 'PROCESSING':
        return <Chip label="Processing" color="info" size="small" icon={<LocalShippingIcon />} />;
      case 'READY':
        return <Chip label="Ready for Pickup" color="warning" size="small" icon={<InventoryIcon />} />;
      case 'COMPLETED':
        return <Chip label="Completed" color="success" size="small" icon={<CheckCircleIcon />} />;
      case 'CANCELLED':
        return <Chip label="Cancelled" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  // Render mobile view of orders
  const renderMobileOrders = () => {
    return (
      <Box>
        {orders.map((order) => (
          <Card key={order.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">
                  Order #{order.id}
                </Typography>
                {renderOrderStatus(order.status)}
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
              
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <Box
                  component="img"
                  src={order.box.image}
                  alt={order.box.title}
                  sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1">
                    {order.box.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {order.quantity}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  ${order.totalPrice.toFixed(2)}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewOrder(order.id)}
                >
                  View
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };

  // Render desktop view of orders
  const renderDesktopOrders = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Box</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="img"
                      src={order.box.image}
                      alt={order.box.title}
                      sx={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 1, mr: 2 }}
                    />
                    {order.box.title}
                  </Box>
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{renderOrderStatus(order.status)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewOrder(order.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Order History
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          View and manage your orders.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : orders.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          You don't have any orders yet. <Button color="primary" onClick={() => navigate('/')}>Browse Boxes</Button>
        </Alert>
      ) : (
        isMobile ? renderMobileOrders() : renderDesktopOrders()
      )}
    </Layout>
  );
};

export default OrderHistory;