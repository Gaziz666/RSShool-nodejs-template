"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTGRES_DB = exports.POSTGRES_PASSWORD = exports.POSTGRES_USERNAME = exports.POSTGRES_PORT = exports.POSTGRES_HOST = exports.AUTH_MODE = exports.JWT_SECRET_KEY = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../../.env'),
});
exports.PORT = process.env['PORT'];
exports.NODE_ENV = process.env['NODE_ENV'];
exports.JWT_SECRET_KEY = process.env['JWT_SECRET_KEY'];
exports.AUTH_MODE = process.env['AUTH_MODE'] === 'true';
exports.POSTGRES_HOST = process.env['POSTGRES_HOST'];
exports.POSTGRES_PORT = process.env['POSTGRES_PORT'];
exports.POSTGRES_USERNAME = process.env['POSTGRES_USERNAME'];
exports.POSTGRES_PASSWORD = process.env['POSTGRES_PASSWORD'];
exports.POSTGRES_DB = process.env['POSTGRES_DB'];
