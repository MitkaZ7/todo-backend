import Router from 'express'
import TasksController from '../controllers/TaskController.js'

const tasksRouter = new Router()

tasksRouter.post('/', TasksController.create);
tasksRouter.get('/', TasksController.getAll);
tasksRouter.get('/:id', TasksController.getOne);
tasksRouter.put('/', TasksController.update);
tasksRouter.delete('/:id', TasksController.delete);

export default tasksRouter;
