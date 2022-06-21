import jwt from 'jsonwebtoken';

export default function authorization(req, res, next) {
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