import apiClient from './apiClient';
import Box from '../../domain/entities/Box';

/**
 * Box API service
 */
const boxApi = {
  /**
   * Get all boxes
   * @returns {Promise<Box[]>} List of boxes
   */
  async getAllBoxes() {
    try {
      const response = await apiClient.get('/boxes');
      return response.data.map(box => Box.fromDTO(box));
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get boxes';
    }
  },

  /**
   * Get a box by ID
   * @param {string} id - Box ID
   * @returns {Promise<Box>} Box
   */
  async getBoxById(id) {
    try {
      const response = await apiClient.get(`/boxes/${id}`);
      return Box.fromDTO(response.data);
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get box';
    }
  },

  /**
   * Get boxes by restaurant ID
   * @param {string} restaurantId - Restaurant ID
   * @returns {Promise<Box[]>} List of boxes
   */
  async getBoxesByRestaurantId(restaurantId) {
    try {
      const response = await apiClient.get(`/boxes/restaurant/${restaurantId}`);
      return response.data.map(box => Box.fromDTO(box));
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get boxes for restaurant';
    }
  },

  /**
   * Create a new box
   * @param {string} title - Box title
   * @param {number} price - Box price
   * @param {number} quantity - Box quantity
   * @param {string} image - Box image URL
   * @returns {Promise<Box>} Created box
   */
  async createBox(title, price, quantity, image) {
    try {
      const response = await apiClient.post('/boxes', {
        title,
        price,
        quantity,
        image
      });
      return Box.fromDTO(response.data);
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create box';
    }
  },

  /**
   * Update a box
   * @param {string} id - Box ID
   * @param {string} title - Box title
   * @param {number} price - Box price
   * @param {number} quantity - Box quantity
   * @param {string} image - Box image URL
   * @returns {Promise<Box>} Updated box
   */
  async updateBox(id, title, price, quantity, image) {
    try {
      const response = await apiClient.put(`/boxes/${id}`, {
        title,
        price,
        quantity,
        image
      });
      return Box.fromDTO(response.data);
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update box';
    }
  },

  /**
   * Update box quantity
   * @param {string} id - Box ID
   * @param {number} quantity - New quantity
   * @returns {Promise<Box>} Updated box
   */
  async updateQuantity(id, quantity) {
    try {
      const response = await apiClient.patch(`/boxes/${id}/quantity`, {
        quantity
      });
      return Box.fromDTO(response.data);
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update quantity';
    }
  },

  /**
   * Delete a box
   * @param {string} id - Box ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteBox(id) {
    try {
      await apiClient.delete(`/boxes/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete box';
    }
  }
};

export default boxApi;