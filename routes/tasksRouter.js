import Router from 'express'
import TasksController from '../controllers/tasks.js'
const tasksRouter = new Router()

tasksRouter.post('/tasks', TasksController.createTask);
tasksRouter.get('/tasks', TasksController.getAllTasks);
tasksRouter.get('/tasks/:id', TasksController.getOneTask);
tasksRouter.put('/tasks', TasksController.updateTask);
tasksRouter.delete('/tasks/:id', TasksController.deleteTask);


export default tasksRouter;
