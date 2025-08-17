/**
 * Order entity
 * Represents an order in the system
 */
export default class Order {
  constructor(id, boxId, userId, quantity, totalPrice, status, createdAt, updatedAt = null) {
    this.id = id;
    this.boxId = boxId;
    this.userId = userId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Create an Order instance from a DTO
   * @param {Object} dto - The data transfer object
   * @returns {Order} A new Order instance
   */
  static fromDTO(dto) {
    return new Order(
      dto.id,
      dto.boxId,
      dto.userId,
      dto.quantity,
      dto.totalPrice,
      dto.status,
      dto.createdAt,
      dto.updatedAt
    );
  }

  /**
   * Convert the Order instance to a DTO
   * @returns {Object} The data transfer object
   */
  toDTO() {
    return {
      id: this.id,
      boxId: this.boxId,
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