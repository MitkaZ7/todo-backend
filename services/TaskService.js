import Task from '../models/Task.js'

class TaskService {
  async createTask(task) {
      const createdTask = await Task.create(task);
      return createdTask;
  }
  async getAllTasks() {

      const tasks = await Task.find();
      return tasks;

  }
  async getOneTask(id) {
      if (!id) {
        throw new Error('ID not provided')
      }
      const task = await Task.findById(id);
      return task;

  }
  async updateTask(task) {
      if (!task._id) {
        throw new Error('ID not provided')
      }
      const updatedTask = await Task.findByIdAndUpdate(task._id, task, { new: true });
      return updatedTask;

  }
  async deleteTask(id) {
      if (!id) {
        throw new Error('ID not found or not exist')
      }
      const task = await Task.findByIdAndDelete(id);
      return task;

  }
}

export default new TaskService();
