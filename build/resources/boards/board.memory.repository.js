"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsRepo = void 0;
const board_model_1 = require("./board.model");
let boards = [];
exports.boardsRepo = {
    getAll: async () => boards,
    getOne: async (boardId) => {
        const board = boards.find((item) => item.id === boardId);
        return board;
    },
    create: async ({ title, columns }) => {
        const newBoard = new board_model_1.Board({ title, columns });
        boards.push(newBoard);
        return newBoard;
    },
    updateOne: async (boardId, body) => {
        const index = boards.findIndex((item) => item.id === boardId);
        if (index < 0) {
            throw new Error('notFound');
        }
        const keys = Object.keys(body);
        keys.forEach((key) => {
            boards[index][key] = body[key];
        });
        return boards[index];
    },
    delete: async (boardId) => {
        const filteredBoards = boards.filter((board) => board.id !== boardId);
        if (boards.length === filteredBoards.length) {
            throw new Error('notFound');
        }
        boards = filteredBoards;
    },
};
