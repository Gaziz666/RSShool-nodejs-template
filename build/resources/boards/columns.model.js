"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Columns = void 0;
const uuid_1 = require("uuid");
class Columns {
    constructor({ id = (0, uuid_1.v4)(), title = 'title', order = 0 }) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
}
exports.Columns = Columns;
