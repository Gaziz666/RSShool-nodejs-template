"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsService = void 0;
const board_repository_1 = require("./board.repository");
exports.boardsService = {
    getAll: async () => {
        const result = await board_repository_1.boardsRepo.getAll();
        return result;
    },
    getOne: async (boardId) => {
        const board = await board_repository_1.boardsRepo.getOne(boardId);
        if (!board)
            throw new Error('notFound');
        return board;
    },
    create: async ({ title, column }) => {
        if (!title || !column) {
            throw new Error('badRequest');
        }
        const board = await board_repository_1.boardsRepo.create({ title, column });
        if (!board)
            throw new Error('board not created');
        return board;
    },
    updateOne: async (boardId, body) => {
        const board = await board_repository_1.boardsRepo.updateOne(boardId, body);
        if (!board)
            throw new Error('notFound');
        return board;
    },
    delete: async (boardId) => {
        await board_repository_1.boardsRepo.delete(boardId);
        // tasksRepo.deleteByBoardId(boardId);
    },
};
