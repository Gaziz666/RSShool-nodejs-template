"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const uuid_1 = require("uuid");
const columns_model_1 = require("./columns.model");
class Board {
    constructor({ id = (0, uuid_1.v4)(), title = 'USER', columns = new columns_model_1.Columns({}) } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }
}
exports.Board = Board;
