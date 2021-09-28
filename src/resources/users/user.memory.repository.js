const User = require('./user.model');

let users = [];

module.exports = {
  getAll: async () => users,

  getOne: async (userId) => {
    const user = users.find((item) => item.id === userId);
    return user;
  },

  create: async ({ name, password, login }) => {
    const newUser = new User({ name, login, password });
    users.push(newUser);
    return newUser;
  },

  updateOne: async (userId, body) => {
    const index = users.findIndex((item) => item.id === userId);
    if (index < 0) {
      throw new Error('notFound');
    }
    const keys = Object.keys(body);
    keys.forEach((key) => {
      users[index][key] = body[key];
    });

    return users[index];
  },

  delete: async (userId) => {
    const filteredUsers = users.filter((user) => user.id !== userId);
    if (users.length === filteredUsers.length) {
      throw new Error('notFound');
    }
    users = filteredUsers;
  },
};
