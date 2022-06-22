import User from '../models/User.js'
import Role from '../models/Role.js'
import AuthError from '../errors/AuthError.js'
import UserService from '../services/UserService.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, isActivated } = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
    // try {
    //   const {email, password} = req.body;
    //   const user = await User.findOne({ email: email});
    //   const matchedPass = await bcrypt.compare(password, user.password, async function(res,err){
    //     if(err) {
    //        throw new AuthError('Неверный логин или пароль');
    //     }
    //   })
    //   const userFound = User.findOne({
    //     email: email,
    //     password: matchedPass,
    //   })
    //   if(!userFound) {
    //     return res.status(400).json({ message: 'User not found with email'})
    //   } else {
    //     const token = generateAccessToken(user._id, user.roles);
    //     res.status(200).json({ token })
    //   }
    // } catch (e) {
    //   console.log(e);
    //   res.status(400).json({ message: 'Login failed' });
    // }
  }
  async logout(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (e) {
      next(e);
    }
  }
}
export default new UserController();
