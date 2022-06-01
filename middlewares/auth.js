import jwt from 'jsonwebtoken';
// const AuthError = require('../errors/AuthError');

// const { NODE_ENV, JWT_SECRET } = process.env;

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new AuthError('Нужна авторизация!');
//   }
//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
//   } catch (err) {
//     throw new AuthError('Нужна авторизация!');
//   }

//   req.user = payload;

//   next();
// };

export default function auth(req, res, next) {
  if(req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
      res.status(403).json({ message: "Пользователь не авторизован" })
    }
    const decodedData = jwt.verify(token, process.env.SECRET);
    req.user = decodedData;
    next()
  } catch (error) {
    console.log(error)
    res.status(403).json({ message:"Пользователь не авторизован"})
  }
}
