
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import UserService from '../service/UserService.js'

// module.exports.getUser = (req, res, next) => {
//   User.findById(req.params.userId).then((user) => {
//     if (user) {
//       return res.status(200).send(user);
//     }
//     throw new NotFoundError('Пользователь с указанным _id не найден.');
//   })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadReqError('Передан невалидный _id'));
//       }
//       next(err);
//     });
// };


// module.exports.updateUser = (req, res, next) => {
//   const userId = req.user._id;
//   const { name, about } = req.body;
//   User.findByIdAndUpdate(
//     userId,
//     { name, about },
//     { new: true, runValidators: true },
//   )
//     .orFail(() => {
//       throw new NotFoundError('Пользователь с указанным ID не найден');
//     })
//     .then((user) => {
//       res.send({ data: user });
//     })
//     .catch((err) => next(err));
// };


class UserController {
  async getUser(req, res) {
    try {
      const user = await UserService.getUser(req.params.id)
      return res.json(user);
    } catch (error) {
      res.status(500).json(error)
    }
  }
  async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      return res.json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async updateUser(req, res) {
    try {

    } catch (error) {

    }
  }

  async registration(req, res) {
    try {
      const {username, password} = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({message: "username already exist"})
      }
      const hashedPassword = bcrypt.hashSync(password, 7);
      const newUser = new User({username, password: hashedPassword})
      await newUser.save()
      return res.json({message: "successful registration"})
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Registration error'});
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username})
      if (!user) {
        return res.status(400).json({message: "Пользователь не найден"})
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if(!validPassword) {
        return res.status(400).json({message: "Пароль не верный"})
      }
      const token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: "24h"})
      return res.json({
        token,
        // user:{
        //   id: user._id,
        //   name: user.username
        // }
      })
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Login error' });
    }
  }
}
export default new UserController();
