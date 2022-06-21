import User from '../models/User.js'
import Role from '../models/Role.js'
class UserController {
  async registration(req, res) {
    try {

    } catch (error) {

    }
  }
  async login(req, res) {
    try {

    } catch (error) {

    }
  }
  async getUsers(req, res) {
    try {
      const userRole = new Role();
      const adminRole = new Role({value: "ADMINISTRATOR"});
      await userRole.save();
      await adminRole.save();
        res.json("ssssss")
    } catch (error) {

    }
  }
}
export default new UserController();
