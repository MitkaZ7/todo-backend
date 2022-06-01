import User from '../models/User.js'

class UserService {

  async getUsers() {
    const usersArray = await User.find();
    return usersArray;
  }

  async getOneUser() {
    try {

    } catch (error) {

    }
  }
  async getUsers() {
    try {

    } catch (error) {

    }
  }
  async registrate() {
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
