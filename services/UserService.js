import User from '../models/User.js';
import MailService from  './MailService.js'
import TokenService from './TokenService.js';
import UserDto from '../dtos/UserDto.js'
import bcrypt from "bcrypt";

import { v4 as uuidv4 } from 'uuid';

class UserService {
  async registration(email, password) {

    const candidate = await User.findOne({ email })
    if (candidate) {
      throw new Error('Email already registered')
    }
    const hashedPwd = await bcrypt.hash(password, 5);
    const activationLink = uuidv4();

    const user = await User.create({ email, password: hashedPwd , activationLink });
    await MailService.sendActvationLink(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({...userDto});
    // const tokens = await TokenService.generateTokens({user});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto}
  }


}
export default new UserService();
