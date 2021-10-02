"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsService = void 0;
const board_memory_repository_1 = require("./board.memory.repository");
const task_memory_repository_1 = require("../tasks/task.memory.repository");
exports.boardsService = {
    getAll: async () => {
        const result = await board_memory_repository_1.boardsRepo.getAll();
        return result;
    },
    getOne: async (boardId) => {
        const board = await board_memory_repository_1.boardsRepo.getOne(boardId);
        if (!board)
            throw new Error('notFound');
        return board;
    },
    create: async ({ title, columns }) => {
        if (!title || !columns) {
            throw new Error('badRequest');
        }
        const board = await board_memory_repository_1.boardsRepo.create({ title, columns });
        if (!board)
            throw new Error('board not created');
        return board;
    },
    updateOne: async (boardId, body) => {
        const board = await board_memory_repository_1.boardsRepo.updateOne(boardId, body);
        if (!board)
            throw new Error('notFound');
        return board;
    },
    delete: async (boardId) => {
        await board_memory_repository_1.boardsRepo.delete(boardId);
        task_memory_repository_1.tasksRepo.deleteByBoardId(boardId);
    },
};
