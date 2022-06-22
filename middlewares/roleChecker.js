import jwt from 'jsonwebtoken';
import 'dotenv/config';
export default function roleCheker(roles) {
  return function(req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        res.status(403).json({ message: "Пользователь не авторизован" })
      }
      const { roles: userRoles } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      let hasRole = false;
      userRoles.forEach(role => {
        if(roles.includes(role)) {
          hasRole = true;
        }
      })
      if (!hasRole) {
        res.status(403).json({ message: "У пользователя не достаточно прав" })
      }
      next()
    } catch (error) {
      console.log(error)
      res.status(403).json({ message: "Пользователь не авторизован" })
    }
  }
}
