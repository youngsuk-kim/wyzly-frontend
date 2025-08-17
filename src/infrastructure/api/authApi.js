import apiClient from './apiClient';
import User from '../../domain/entities/User';

/**
 * Authentication API service
 */
const authApi = {
  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{user: User, token: string}>} User and token
   */
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      return {
        user: User.fromDTO(user),
        token
      };
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  /**
   * Register a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} name - User name
   * @param {string} role - User role
   * @returns {Promise<{user: User, token: string}>} User and token
   */
  async register(email, password, name, role) {
    try {
      const response = await apiClient.post('/auth/register', { email, password, name, role });
      const { user, token } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      return {
        user: User.fromDTO(user),
        token
      };
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  /**
   * Logout the current user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await apiClient.post('/auth/logout', {}, {
          headers: { Authorization: token }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always remove token from localStorage
      localStorage.removeItem('token');
    }
  },

  /**
   * Get the current user
   * @returns {Promise<User>} Current user
   */
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await apiClient.get('/auth/me', {
        headers: { Authorization: token }
      });
      
      return User.fromDTO(response.data);
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get current user';
    }
  },

  /**
   * Check if the user is authenticated
   * @returns {boolean} True if the user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

export default authApi;