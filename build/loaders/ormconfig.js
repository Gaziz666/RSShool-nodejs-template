"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_model_1 = require("../resources/users/user.model");
const config_1 = require("../common/config");
console.log(user_model_1.User);
const DBConnection = async () => await (0, typeorm_1.createConnection)({
    type: 'postgres',
    host: config_1.POSTGRES_HOST,
    port: config_1.POSTGRES_PORT,
    username: config_1.POSTGRES_USERNAME,
    password: config_1.POSTGRES_PASSWORD,
    database: config_1.POSTGRES_DB,
    entities: [user_model_1.User],
    synchronize: true,
    logging: true,
});
exports.default = DBConnection;
