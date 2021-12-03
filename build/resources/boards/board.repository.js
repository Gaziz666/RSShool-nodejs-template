"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsRepo = void 0;
const typeorm_1 = require("typeorm");
const board_model_1 = require("./board.model");
exports.boardsRepo = {
    getAll: async () => await (0, typeorm_1.getRepository)(board_model_1.Board).find(),
    getOne: async (boardId) => {
        const board = await (0, typeorm_1.getRepository)(board_model_1.Board).findOne(boardId);
        return board;
    },
    create: async ({ title, column }) => {
        const newBoard = await (0, typeorm_1.getRepository)(board_model_1.Board)
            .createQueryBuilder()
            .insert()
            .into(board_model_1.Board)
            .values({ title, column })
            .returning('*')
            .execute();
        return newBoard;
    },
    updateOne: async (boardId, body) => {
        const updatedBoard = (0, typeorm_1.getRepository)(board_model_1.Board)
            .createQueryBuilder()
            .update()
            .set(body)
            .where('id = :id', { id: boardId })
            .returning('*')
            .execute()
            .then((response) => response.raw[0]);
        return updatedBoard;
    },
    delete: async (boardId) => {
        const result = await (0, typeorm_1.getRepository)(board_model_1.Board).delete({ id: boardId });
        return result;
    },
};
