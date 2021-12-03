"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const user_repository_1 = require("./user.repository");
exports.usersService = {
    getAll: async () => {
        const result = await user_repository_1.usersRepo.getAll();
        return result;
    },
    getOne: async (userId) => {
        const user = await user_repository_1.usersRepo.getOne(userId);
        if (!user)
            throw new Error('notFound');
        return user;
    },
    create: async ({ name, login, password }) => {
        if (!name || !login || !password) {
            throw new Error('badRequest');
        }
        const user = await user_repository_1.usersRepo.create({ name, login, password });
        if (!user)
            throw new Error('user not created');
        return user;
    },
    updateOne: async (userId, body) => {
        const user = await user_repository_1.usersRepo.updateOne(userId, body);
        if (!user)
            throw new Error('notFound');
        return user;
    },
    deleteOne: async (userId) => {
        await user_repository_1.usersRepo.deleteOne(userId);
        // await tasksRepo.deleteUserId(userId);
    },
};
