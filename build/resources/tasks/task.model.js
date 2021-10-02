"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid_1 = require("uuid");
class Task {
    constructor({ id = (0, uuid_1.v4)(), title = 'USER', order = 0, description = '', userId = null, boardId = '', columnId = '', }) {
        this.create = (title = 'USER', order, description = '', userId, boardId = '', columnId = '') => {
            this.id = (0, uuid_1.v4)();
            this.title = title;
            this.order = order;
            this.description = description;
            this.userId = userId;
            this.boardId = boardId;
            this.columnId = columnId;
            return this;
        };
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
exports.Task = Task;
