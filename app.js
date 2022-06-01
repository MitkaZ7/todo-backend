import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import tasksRouter from './routes/tasksRouter.js';
import usersRouter from './routes/usersRouter.js';
import authorization from './middlewares/auth.js';
import UserController from './controllers/UserController.js';

const app = express();
app.use(express.json());

app.post('/signin', UserController.login);
app.post('/signup', UserController.registration);

app.use(authorization);

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
// app.use('/', ()=>{
//   console.log('PAGE NOT FOUND')
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
