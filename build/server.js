"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./common/config");
const ormconfig_1 = __importDefault(require("./loaders/ormconfig"));
const app_1 = __importDefault(require("./app"));
(0, ormconfig_1.default)()
    .then((connect) => {
    if (connect.isConnected) {
        console.log('DB is connected');
        app_1.default.listen(config_1.PORT, () => console.log(`App is running on http://localhost:${config_1.PORT}`));
    }
})
    .catch((err) => {
    console.log(err);
});
