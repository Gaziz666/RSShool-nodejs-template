"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
// import DBConnection from './loaders/ormconfig';
const errHandler_1 = require("./errorhandler/errHandler");
const user_router_1 = require("./resources/users/user.router");
const board_router_1 = require("./resources/boards/board.router");
// const app = DBConnection.then((connect) => {
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../doc/api.yaml'));
const app = (0, express_1.default)();
process.on('uncaughtException', errHandler_1.uncaughtExceptionHandler);
process.on('unhandledRejection', errHandler_1.unhandledRejectionHandler);
app.use(express_1.default.json());
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});
app.use(errHandler_1.requestLogger);
app.use('/users', user_router_1.userRouter);
app.use('/boards', board_router_1.boardRouter);
app.use(errHandler_1.errorLogger);
app.use(errHandler_1.errorHandler);
// return app;
// }).catch((err) => {
//   console.log('err', err);
//   return err;
// });
exports.default = app;
