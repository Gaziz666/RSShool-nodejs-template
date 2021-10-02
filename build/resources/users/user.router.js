"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("./user.model");
const user_service_1 = require("./user.service");
const Router = express_1.default.Router();
exports.userRouter = Router;
Router.route('/').get(async (_req, res) => {
    const users = await user_service_1.usersService.getAll();
    res.json(users.map(user_model_1.User.toResponse));
});
Router.route('/').post(async (req, res, next) => {
    try {
        const user = await user_service_1.usersService.create(req.body);
        res.status(201).json(user_model_1.User.toResponse(user));
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
Router.route('/:userId').get(async (req, res, next) => {
    try {
        const user = await user_service_1.usersService.getOne(req.params['userId']);
        res.json(user_model_1.User.toResponse(user));
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
Router.route('/:userId').put(async (req, res, next) => {
    try {
        const user = await user_service_1.usersService.updateOne(req.params['userId'], req.body);
        res.json(user_model_1.User.toResponse(user));
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
Router.route('/:userId').delete(async (req, res, next) => {
    try {
        await user_service_1.usersService.deleteOne(req.params.userId);
        res.sendStatus(204);
    }
    catch (err) {
        if (err === 'notFound') {
            res.sendStatus(404);
        }
        else {
            next(err);
        }
    }
});
