import jwt from "jsonwebtoken";
import Token from '../models/Token.js';
class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'7d'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {accessToken, refreshToken}
  }
  async saveToken(userID, refreshToken) {
    const tokenData = await Token.findOne({user: userID})
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({user: userID, refreshToken});
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({refreshToken});
    return tokenData;
  }
  validateAccessToken(accessToken){
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }


}
export default new TokenService();
