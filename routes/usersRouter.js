import Router from 'express'
import UserController from '../controllers/users.js'
import authorization from '../middlewares/auth.js'
import roleCheker from '../middlewares/roleChecker.js'

const usersRouter = new Router();

usersRouter.get('/users', roleCheker(['ADMINISTRATOR']), UserController.getUsers);
// usersRouter.get('/me', UserController.getUser);
// usersRouter.get('/:id', UserController.getUser);
usersRouter.post('/registration', UserController.registration);
usersRouter.post('/login', UserController.login);
// usersRouter.patch('/me', UserController.updateUser);



export default usersRouter;
