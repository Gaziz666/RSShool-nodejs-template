"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unhandledRejectionHandler = exports.uncaughtExceptionHandler = exports.errorHandler = exports.errorLogger = exports.requestLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const path = 'log/log.txt';
// all errors show on console add date and counter
const requestLogger = (req, res, next) => {
    fs_1.default.appendFile(path, `${new Date()} url: ${req.url}, method: ${req.method}, params: ${JSON.stringify(req.params)}, query: ${JSON.stringify(req.query)}, body: ${JSON.stringify(req.body)}, statusCode: ${res.statusCode}\n`, (err) => {
        if (err) {
            console.error('err', err.message);
            throw err;
        }
    });
    next();
};
exports.requestLogger = requestLogger;
const errorLogger = (err, _req, _res, next) => {
    fs_1.default.appendFile(path, `error: ${err.stack}`, (err) => {
        console.log(err);
    });
    next(err);
};
exports.errorLogger = errorLogger;
const errorHandler = (err, _req, res) => {
    res.status(500);
    res.render('error', { error: err });
};
exports.errorHandler = errorHandler;
const uncaughtExceptionHandler = (err) => {
    console.log(err);
    fs_1.default.appendFile(path, `uncaughtExceptionHandler: ${err.stack || err.message}`, (err) => {
        console.log(err);
    });
    process.exit(1);
};
exports.uncaughtExceptionHandler = uncaughtExceptionHandler;
// WIP
const unhandledRejectionHandler = (reject, resolve) => {
    fs_1.default.appendFile(path, `unhandledRejectionHandler: ${reject || resolve}`, (err) => {
        console.log(err);
    });
    process.exit(1);
};
exports.unhandledRejectionHandler = unhandledRejectionHandler;
