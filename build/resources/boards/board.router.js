"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardRouter = void 0;
const express_1 = __importDefault(require("express"));
const board_service_1 = require("./board.service");
const task_service_1 = require("../tasks/task.service");
const Router = express_1.default.Router();
exports.boardRouter = Router;
Router.route('/').get(async (req, res) => {
    req.headers;
    const boards = await board_service_1.boardsService.getAll();
    res.json(boards);
});
Router.route('/').post(async (req, res, next) => {
    try {
        const board = await board_service_1.boardsService.create(req.body);
        res.status(201).json(board);
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
        const board = await board_service_1.boardsService.getOne(req.params.boardId);
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
        const board = await board_service_1.boardsService.updateOne(req.params.boardId, req.body);
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
        await board_service_1.boardsService.delete(req.params.boardId);
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
// task routes
Router.route('/:boardId/tasks').get(async (req, res, next) => {
    try {
        const task = await task_service_1.tasksService.getAll(req.params.boardId);
        res.json(task);
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
Router.route('/:boardId/tasks').post(async (req, res, next) => {
    try {
        const task = await task_service_1.tasksService.create(req.params.boardId, req.body);
        res.status(201).json(task);
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
Router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
    try {
        const task = await task_service_1.tasksService.getOne(req.params.boardId, req.params.taskId);
        res.json(task);
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
Router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
    try {
        const task = await task_service_1.tasksService.updateOne(req.params.boardId, req.params.taskId, req.body);
        res.json(task);
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
Router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
    try {
        await task_service_1.tasksService.delete(req.params.taskId);
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
