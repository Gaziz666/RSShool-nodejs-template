"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const user_memory_repository_1 = require("./user.memory.repository");
const task_memory_repository_1 = require("../tasks/task.memory.repository");
exports.usersService = {
    getAll: async () => {
        const result = await user_memory_repository_1.usersRepo.getAll();
        return result;
    },
    getOne: async (userId) => {
        const user = await user_memory_repository_1.usersRepo.getOne(userId);
        if (!user)
            throw new Error('notFound');
        return user;
    },
    create: async ({ name, login, password }) => {
        if (!name || !login || !password) {
            throw new Error('badRequest');
        }
        const user = await user_memory_repository_1.usersRepo.create({ name, login, password });
        if (!user)
            throw new Error('user not created');
        return user;
    },
    updateOne: async (userId, body) => {
        const user = await user_memory_repository_1.usersRepo.updateOne(userId, body);
        if (!user)
            throw new Error('notFound');
        return user;
    },
    deleteOne: async (userId) => {
        await user_memory_repository_1.usersRepo.deleteOne(userId);
        await task_memory_repository_1.tasksRepo.deleteUserId(userId);
    },
};
