import TaskService from '../service/TaskService.js';

class TaskController {
  async create(req, res){
    try {
      const task = await TaskService.create(req.body);
      res.status(200).json(task);
    } catch (error) {
      console.log(error);
  }
}

  async getAll(req, res) {
  try {
    const tasksArray = await TaskService.getAll();
    return res.json(tasksArray);
  } catch (error) {
    res.status(500).json(error);
  }
}

  async getOne(req, res) {
  try {
    const task = await TaskService.getOne(req.params.id)
    return res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
}

  async update(req, res) {
  try {
    const updatedTask = await TaskService.update(req.body)
    return res.json(updatedTask);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

  async delete(req, res) {
  try {
    const task = await TaskService.delete(req.params.id);
    return res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }


}

}

export default new TaskController();
