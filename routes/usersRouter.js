import Router from 'express'
import UserController from '../controllers/UserController.js'
const usersRouter = new Router();
import auth from '../middlewares/auth.js'
usersRouter.get('/', auth, UserController.getUsers);
usersRouter.get('/me', UserController.getOneUser);
usersRouter.get('/:id', UserController.getOneUser);
usersRouter.post('/registration', UserController.registration);
usersRouter.post('/login', UserController.login);

usersRouter.patch('/me', UserController.updateUser);


export default usersRouter;
