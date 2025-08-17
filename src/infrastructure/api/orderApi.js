import apiClient from './apiClient';
import Order from '../../domain/entities/Order';
import OrderWithBox from '../../domain/entities/OrderWithBox';

/**
 * Order API service
 */
const orderApi = {
  /**
   * Get all orders (admin only)
   * @returns {Promise<Order[]>} List of orders
   */
  async getAllOrders() {
    try {
      const response = await apiClient.get('/orders');
      return response.data.map(order => Order.fromDTO(order));
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get orders';
    }
  },

  /**
   * Get an order by ID
   * @param {string} id - Order ID
   * @returns {Promise<Order>} Order
   */
  async getOrderById(id) {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return Order.fromDTO(response.data);
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get order';
    }
  },

  /**
   * Get orders for the current user
   * @returns {Promise<Order[]>} List of orders
   */
  async getOrdersByUser() {
    try {
      const response = await apiClient.get('/orders/user');
      return response.data.map(order => Order.fromDTO(order));
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get user orders';
    }
  },

  /**
   * Get orders with box details for the current user
   * @returns {Promise<OrderWithBox[]>} List of orders with box details
   */
  async getOrdersWithBoxDetailsByUser() {
    try {
      const response = await apiClient.get('/orders/user/with-box-details');
      return response.data.map(order => OrderWithBox.fromDTO(order));
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get user orders with box details';
    }
  },

  /**
   * Create a new order
   * @param {string} boxId - Box ID
   * @param {number} quantity - Order quantity
   * @returns {Promise<Order>} Created order
   */
  async createOrder(boxId, quantity) {
    try {
      const response = await apiClient.post('/orders', {
        boxId,
        quantity
      });
      return Order.fromDTO(response.data);
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create order';
    }
  },

  /**
   * Update order status
   * @param {string} id - Order ID
   * @param {string} status - New status
   * @returns {Promise<Order>} Updated order
   */
  async updateOrderStatus(id, status) {
    try {
      const response = await apiClient.patch(`/orders/${id}/status`, {
        status
      });
      return Order.fromDTO(response.data);
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update order status';
    }
  }
};

export default orderApi;