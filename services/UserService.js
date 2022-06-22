import User from '../models/User.js';
import MailService from  './MailService.js'
import TokenService from './TokenService.js';
import UserDto from '../dtos/UserDto.js'
import AuthError from '../errors/AuthError.js'
import BadReqError from '../errors/BadReqError.js'
import ExistUserError from '../errors/ExistUserError.js'
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';


class UserService {
  async registration(email, password) {

    const candidate = await User.findOne({ email })
    if (candidate) {
      throw new ExistUserError('Пользователь с данным semail уже cуществует');
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
  async activate(activationLink) {
    const user = await User.findOne({activationLink});
    if (!user) {
      throw new AuthError.UnauthorizedError();
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({email});
    if (!user) {
      throw new AuthError('Пользователь не найден');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AuthError('Неверный логин или пароль');
    }
    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto}


  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new AuthError('Пользователь не авторизован')
    }
    const userData = await TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new AuthError('Пользователь не авторизован');
    }

    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto }

  }



  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }


}
export default new UserService();
