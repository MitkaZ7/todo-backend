import User from '../models/user.js'

class UserService {
  async getUser(id) {
    if (!id) {
      throw new Error('Пользователь не найден или не существует');
    }
    const user = await User.findById(id);
    return user;
  }
  async getUsers() {
      const users = await User.find();
      return users;
  }
  async registration() {
    try {

    } catch (error) {

    }
  }
  async updateUser() {
    try {

    } catch (error) {

    }
  }
  async login() {
    try {

    } catch (error) {

    }
  }
}

export default new UserService();
