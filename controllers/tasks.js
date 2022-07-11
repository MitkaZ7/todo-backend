
import TaskService from '../services/TaskService.js';

class TasksController {
  async createTask(req, res) {
    try {
      const task = await TaskService.createTask(req.body)
      console.log(req.body)
      res.status(200).send(task);
    } catch (error) {
      res.status(500).json(error);
  }
  }
  async getAllTasks(req, res) {
    try {
      const tasks = await TaskService.getAllTasks()

      return res.json(tasks);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getOneTask(req, res) {
    try {
      const task = await TaskService.getOneTask(req.params.id);
      return res.json(task);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async updateTask(req, res) {
    try {

      const updatedTask = await TaskService.updateTask(req.body);
      return res.json(updatedTask);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async deleteTask(req, res) {
    try {
        const task = await TaskService.deleteTask(req.params.id);
      return res.send(task);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}


export default new TasksController();
