"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = void 0;
const user_model_1 = require("./user.model");
let users = [];
exports.usersRepo = {
    getAll: async () => users,
    getOne: async (userId) => {
        const user = users.find((item) => item.id === userId);
        return user;
    },
    create: async ({ name, password, login }) => {
        const newUser = new user_model_1.User({ name, login, password });
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
    deleteOne: async (userId) => {
        const filteredUsers = users.filter((user) => user.id !== userId);
        if (users.length === filteredUsers.length) {
            throw new Error('notFound');
        }
        users = filteredUsers;
    },
};
