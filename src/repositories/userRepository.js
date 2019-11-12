import User from '../model/user';

/**
 * Class representing an User data repository.
 */
export default class UserRepository {

  /**
   * Creates an UserRepository.
   * @param {Object} initialData The user data.
   */
  constructor(initialData) {
    this.data = initialData;
  }

  /**
   * Get an User by Id.
   * @param {*} id The Id to look an user by.
   */
  getUserById(id) {
    const result = this.data[id];

    if (result) {
      return result;
    } else {
      alert("User not found");

      return null;
    }
  }

  /**
   * Retrives all users.
   */
  getAllUsers() {
    return Object.keys(this.data).map((id) => this.data[id]);
  }
}

/**
 * Creating mock data.
 */
UserRepository.testFactory = () => new UserRepository(
  {
    '245432': new User('245432', 30),
    '985768': new User('985768', 0),
    '096573': new User('096573', 3.2),
  }
);
