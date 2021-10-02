"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksService = void 0;
const task_memory_repository_1 = require("./task.memory.repository");
exports.tasksService = {
    getAll: async (boardId) => {
        const result = await task_memory_repository_1.tasksRepo.getAll(boardId);
        return result;
    },
    getOne: async (boardId, taskId) => {
        const task = await task_memory_repository_1.tasksRepo.getOne(boardId, taskId);
        if (!task)
            throw new Error('notFound');
        return task;
    },
    create: async (boardId, { title, order, description, userId, columnId }) => {
        if (!title || !(+order >= 0) || !description) {
            throw new Error('badRequest');
        }
        const task = await task_memory_repository_1.tasksRepo.create({
            title,
            order,
            description,
            userId,
            boardId,
            columnId,
        });
        if (!task)
            throw new Error('task not created');
        return task;
    },
    updateOne: async (boardId, taskId, body) => {
        const task = await task_memory_repository_1.tasksRepo.updateOne(boardId, taskId, body);
        if (!task)
            throw new Error('notFound');
        return task;
    },
    delete: async (taskId) => {
        await task_memory_repository_1.tasksRepo.delete(taskId);
    },
};
