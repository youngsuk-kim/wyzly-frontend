/**
 * Box entity
 * Represents a box (product) in the system
 */
export default class Box {
  constructor(id, title, price, quantity, image, restaurantId, createdAt, updatedAt = null) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.restaurantId = restaurantId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Create a Box instance from a DTO
   * @param {Object} dto - The data transfer object
   * @returns {Box} A new Box instance
   */
  static fromDTO(dto) {
    return new Box(
      dto.id,
      dto.title,
      dto.price,
      dto.quantity,
      dto.image,
      dto.restaurantId,
      dto.createdAt,
      dto.updatedAt
    );
  }

  /**
   * Convert the Box instance to a DTO
   * @returns {Object} The data transfer object
   */
  toDTO() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      quantity: this.quantity,
      image: this.image,
      restaurantId: this.restaurantId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Check if the box is in stock
   * @returns {boolean} True if the box is in stock
   */
  isInStock() {
    return this.quantity > 0;
  }

  /**
   * Get the formatted price
   * @returns {string} The formatted price
   */
  getFormattedPrice() {
    return `$${this.price.toFixed(2)}`;
  }
}