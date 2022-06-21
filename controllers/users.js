import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from "bcrypt";
const saltRounds = 5;
class UserController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message:'Email already registered'})
      }
      const userRole = await Role.findOne({ value: "USER" })
      await bcrypt.hash(password, saltRounds).then((hash) => User.create(
        {
          email,
          password: hash,
          roles: [userRole.value]
        }
      ));
      return res.status(201).json({ message: 'Successfully registered'});
    } catch(e) {
        console.log(e);
        res.status(400).json({message: 'Registration failed'});
    }
  }
  async login(req, res) {
    try {

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login failed' });
    }
  }
  async getUsers(req, res) {
    try {
      // временный код для сощания пары ролей в базе
      // const userRole = new Role();
      // const adminRole = new Role({value: "ADMINISTRATOR"});
      // await userRole.save();
      // await adminRole.save();
        res.json("ssssss")
    } catch (e) {

    }
  }
}
export default new UserController();
