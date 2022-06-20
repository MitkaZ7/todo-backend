import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tasksRouter from './routes/tasksRouter.js';
import usersRouter from './routes/usersRouter.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
const allowedCors = [
  'http://localhost:8080'
];
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedCors);
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  next();
});




// app.use('/users', usersRouter);
app.use('/api', tasksRouter);


// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;
//   res.status(statusCode).send({
//     message: statusCode === 500 ? 'Ошибка сервера' : message
//   });
//   next();
// })



async function startApp() {
    try {
        await mongoose.connect(process.env.DATABASE_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server started at port: ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
startApp();
