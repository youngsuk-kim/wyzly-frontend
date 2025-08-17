/**
 * OrderWithBox entity
 * Represents an order with box details in the system
 */
import Box from './Box';

export default class OrderWithBox {
  constructor(id, box, userId, quantity, totalPrice, status, createdAt, updatedAt = null) {
    this.id = id;
    this.box = box;
    this.userId = userId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Create an OrderWithBox instance from a DTO
   * @param {Object} dto - The data transfer object
   * @returns {OrderWithBox} A new OrderWithBox instance
   */
  static fromDTO(dto) {
    return new OrderWithBox(
      dto.id,
      Box.fromDTO(dto.box),
      dto.userId,
      dto.quantity,
      dto.totalPrice,
      dto.status,
      dto.createdAt,
      dto.updatedAt
    );
  }

  /**
   * Convert the OrderWithBox instance to a DTO
   * @returns {Object} The data transfer object
   */
  toDTO() {
    return {
      id: this.id,
      box: this.box.toDTO(),
      userId: this.userId,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Get the formatted total price
   * @returns {string} The formatted total price
   */
  getFormattedTotalPrice() {
    return `$${this.totalPrice.toFixed(2)}`;
  }

  /**
   * Check if the order is completed
   * @returns {boolean} True if the order is completed
   */
  isCompleted() {
    return this.status === 'COMPLETED';
  }

  /**
   * Check if the order is pending
   * @returns {boolean} True if the order is pending
   */
  isPending() {
    return this.status === 'PENDING';
  }

  /**
   * Check if the order is cancelled
   * @returns {boolean} True if the order is cancelled
   */
  isCancelled() {
    return this.status === 'CANCELLED';
  }
}