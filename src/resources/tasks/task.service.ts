const tasksRepo = require('./task.memory.repository');

module.exports = {
  getAll: async (boardId) => {
    const result = await tasksRepo.getAll(boardId);
    return result;
  },

  getOne: async (boardId, taskId) => {
    const task = await tasksRepo.getOne(boardId, taskId);
    if (!task) throw new Error('notFound');
    return task;
  },

  create: async (boardId, { title, order, description, userId, columnId }) => {
    if (!title || !(+order >= 0) || !description) {
      throw new Error('badRequest');
    }
    const task = await tasksRepo.create({
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    if (!task) throw new Error('task not created');
    return task;
  },

  updateOne: async (boardId, taskId, body) => {
    const task = await tasksRepo.updateOne(boardId, taskId, body);
    if (!task) throw new Error('notFound');
    return task;
  },

  delete: async (boardId, taskId) => {
    await tasksRepo.delete(boardId, taskId);
  },
};
