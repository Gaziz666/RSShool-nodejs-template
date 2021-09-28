const boardsRepo = require('./board.memory.repository');

module.exports = {
  getAll: async () => {
    const result = await boardsRepo.getAll();
    return result;
  },

  getOne: async (boardId) => {
    const board = await boardsRepo.getOne(boardId);
    if (!board) throw new Error('notFound');
    return board;
  },

  create: async ({ title, columns }) => {
    if (!title || !columns) {
      throw new Error('badRequest');
    }
    const board = await boardsRepo.create({ title, columns });
    if (!board) throw new Error('board not created');
    return board;
  },

  updateOne: async (boardId, body) => {
    const board = await boardsRepo.updateOne(boardId, body);
    if (!board) throw new Error('notFound');
    return board;
  },

  delete: async (boardId) => {
    await boardsRepo.delete(boardId);
  },
};
