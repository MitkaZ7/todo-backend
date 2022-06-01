
import Task from '../models/task.js';

class TaskService {
  async create({task}) {
    const createdTask = await Task.create({task});
        return createdTask;
}

  async getAll() {
    const tasksArray = await Task.find();
    return tasksArray;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('Task not found');
    }
    const task = await Task.findById(id);
      return task;
  }
  async update(task) {
    if (!task._id) {
      throw new Error('Task not found');
    }
    const updatedTask = await Task.findByIdAndUpdate(task._id, task, { new: true })
      return updatedTask;

  }
  async delete(id) {
    if (!id) {
      throw new Error('Task not found');
    }
    const deletedTask = await Task.findByIdAndDelete(id);
      return deletedTask;
  }
}

export default  new TaskService();
