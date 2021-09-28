const Task = require('./task.model');

let tasks = [];

module.exports = {
  getAll: async (boardId) => {
    const result = tasks.filter((item) => item.boardId === boardId);
    return result;
  },

  getOne: async (boardId, taskId) => {
    const task = tasks.find(
      (item) => item.id === taskId && item.boardId === boardId
    );
    return task;
  },

  create: async ({ title, order, description, userId, boardId, columnId }) => {
    const newTask = new Task({
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    tasks.push(newTask);
    return newTask;
  },

  updateOne: async (boardId, taskId, body) => {
    const index = tasks.findIndex(
      (item) => item.id === taskId && item.boardId === boardId
    );
    if (index < 0) {
      throw new Error('notFound');
    }
    const keys = Object.keys(body);
    keys.forEach((key) => {
      tasks[index][key] = body[key];
    });

    return tasks[index];
  },

  delete: async (boardId, taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    if (tasks.length === filteredTasks.length) {
      throw new Error('notFound');
    }
    tasks = filteredTasks;
  },

  deleteByBoardId: async (boardId) => {
    const filteredTasks = tasks.filter((task) => task.boardId !== boardId);
    if (tasks.length === filteredTasks.length) {
      throw new Error('notFound');
    }
    tasks = filteredTasks;
  },

  deleteUserId: async (userId) => {
    const mapTask = tasks.map((task) => {
      const newTask = task;
      if (newTask.userId === userId) {
        newTask.userId = null;
      }
      return newTask;
    });
    tasks = mapTask;
  },
};
