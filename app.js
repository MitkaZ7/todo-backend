import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import tasksRouter from './routes/tasksRouter.js';
import usersRouter from './routes/usersRouter.js';
// import authRouter from './routes/authRouter.js';

const app = express();


app.use(express.json());
app.use('/api', tasksRouter);
// app.use('/auth', authRouter);

app.use('/users', usersRouter);


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
