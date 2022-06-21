import User from '../models/User.js'
import Role from '../models/Role.js'
import AuthError from '../errors/AuthError.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const saltRounds = 5;

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, 'key', { expiresIn: "3d"});
}
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
      const {email, password} = req.body;
      const user = await User.findOne({ email: email});
      const matchedPass = await bcrypt.compare(password, user.password, async function(res,err){
        if(err) {
           throw new AuthError('Неверный логин или пароль');
        }
      })
      const userFound = User.findOne({
        email: email,
        password: matchedPass,
      })
      if(!userFound) {
        return res.status(400).json({ message: 'User not found with email'})
      } else {
        const token = generateAccessToken(user._id, user.roles);
        res.status(200).json({ token })
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login failed' });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (e) {

    }
  }
}
export default new UserController();
