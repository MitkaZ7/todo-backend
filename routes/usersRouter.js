import Router from 'express'
import UserController from '../controllers/users.js'
import authorization from '../middlewares/auth.js'
import roleCheker from '../middlewares/roleChecker.js'

const usersRouter = new Router();


// usersRouter.get('/me', UserController.getUser);
// usersRouter.get('/:id', UserController.getUser);
usersRouter.post('/registration', UserController.registration);
usersRouter.post('/login', UserController.login);
usersRouter.post('/logout', UserController.logout);
usersRouter.get('/activate/:link', UserController.activate);
usersRouter.get('/refresh', UserController.refresh);
// usersRouter.get('/users', roleCheker(['ADMINISTRATOR', 'USER']), UserController.getUsers);
usersRouter.get('/users', authorization, UserController.getUsers);

// usersRouter.patch('/me', UserController.updateUser);



export default usersRouter;
