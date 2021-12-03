"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardRouter = void 0;
const express_1 = __importDefault(require("express"));
const board_service_1 = require("./board.service");
// import { tasksService } from '../tasks/task.service';
const Router = express_1.default.Router();
exports.boardRouter = Router;
Router.route('/').get(async (req, res) => {
    req.headers;
    const boards = await board_service_1.boardsService.getAll();
    res.json(boards);
});
Router.route('/').post(async (_err, req, res, next) => {
    try {
        const board = await board_service_1.boardsService.create(req.body);
        // res.status(201).json(board);
        res.json(board);
    }
    catch (err) {
        if (err.message === 'badRequest') {
            res.sendStatus(400);
        }
        else {
            next(err);
        }
    }
});
Router.route('/:boardId').get(async (req, res, next) => {
    try {
        const board = await board_service_1.boardsService.getOne(+req.params.boardId);
        res.json(board);
    }
    catch (err) {
        if (err.message === 'notFound') {
            res.sendStatus(404);
        }
        else {
            next(err);
        }
    }
});
Router.route('/:boardId').put(async (req, res, next) => {
    try {
        const board = await board_service_1.boardsService.updateOne(+req.params.boardId, req.body);
        res.json(board);
    }
    catch (err) {
        if (err.message === 'notFound') {
            res.sendStatus(404);
        }
        else if (err.message === 'badRequest') {
            res.sendStatus(400);
        }
        else {
            next(err);
        }
    }
});
Router.route('/:boardId').delete(async (req, res, next) => {
    try {
        await board_service_1.boardsService.delete(+req.params.boardId);
        res.sendStatus(204);
    }
    catch (err) {
        if (err.message === 'notFound') {
            res.sendStatus(404);
        }
        else {
            next(err);
        }
    }
});
