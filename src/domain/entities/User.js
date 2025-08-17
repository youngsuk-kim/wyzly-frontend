/**
 * User entity
 * Represents a user in the system
 */
export default class User {
  constructor(id, email, name, role, createdAt, updatedAt = null) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Create a User instance from a DTO
   * @param {Object} dto - The data transfer object
   * @returns {User} A new User instance
   */
  static fromDTO(dto) {
    return new User(
      dto.id,
      dto.email,
      dto.name,
      dto.role,
      dto.createdAt,
      dto.updatedAt
    );
  }

  /**
   * Convert the User instance to a DTO
   * @returns {Object} The data transfer object
   */
  toDTO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}