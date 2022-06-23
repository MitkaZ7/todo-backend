import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AuthError from '../errors/AuthError.js';
import TokenService from '../services/TokenService.js';
export default function authorization(req, res, next) {
  // if(req.method === "OPTIONS") {
  //   next();
  // }
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new AuthError('Пользователь не авторизован');
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken){
      throw new AuthError('Пользователь не авторизован');
    }
    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new AuthError('Пользователь не авторизован');
    }
    req.user  = userData;
    next()
  } catch (e) {
    return next(new AuthError('Пользователь не авторизован'))
    // console.log(error)
    // res.status(403).json({ message:"Пользователь не авторизован"})
  }
}
