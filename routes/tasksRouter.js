import Router from 'express'
import TasksController from '../controllers/TaskController.js'

const tasksRouter = new Router()

tasksRouter.post('/tasks', TasksController.create);
tasksRouter.get('/tasks', TasksController.getAll);
tasksRouter.get('/tasks/:id', TasksController.getOne);
tasksRouter.put('/tasks', TasksController.update);
tasksRouter.delete('/tasks/:id', TasksController.delete);

export default tasksRouter;
