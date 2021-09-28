const usersRepo = require('./user.memory.repository');

module.exports = {
  getAll: async () => {
    const result = await usersRepo.getAll();
    return result;
  },

  getOne: async (userId) => {
    const user = await usersRepo.getOne(userId);
    if (!user) throw new Error('notFound');
    return user;
  },

  create: async ({ name, login, password }) => {
    if (!name || !login || !password) {
      throw new Error('badRequest');
    }
    const user = await usersRepo.create({ name, login, password });
    if (!user) throw new Error('user not created');
    return user;
  },

  updateOne: async (userId, body) => {
    const user = await usersRepo.updateOne(userId, body);
    if (!user) throw new Error('notFound');
    return user;
  },

  delete: async (userId) => {
    await usersRepo.delete(userId);
  },
};
