// import 'dotenv/config';
// import bcrypt from 'bcrypt';
// import User from '../models/User.js';
// import Role from '../models/Role.js';
// class AuthController {
//   async registration(req, res) {
//     try {
//       const {username, password} = req.body
//       const candidate = await User.findOne({username})
//       if (candidate) {
//         return res.status(400).json({message: "User with this name already exists"})
//       }
//       const hashedPassword = bcrypt.hashSync(password, 7)
//       const userRole = await Role.findOne({ value: "User" })
//       const user = new User({ username, password: hashedPassword, roles: [userRole.value]})
//       await user.save()
//       return res.json({message: "User successfully registered"})
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({message: "Rgistration error"})
//     }
//   }
//   async login(req, res) {
//     try {

//     } catch (error) {

//     }
//   }
//   async getUsers(req, res) {
//     try {
//       // временное решение для инициализации ролей пользователей:
//       // const userRole = new Role();
//       // const adminRole = new Role({value: 'Admin'});
//       // userRole.save();
//       // adminRole.save();
//     } catch (error) {

//     }
//   }
// }

// export default new AuthController();
