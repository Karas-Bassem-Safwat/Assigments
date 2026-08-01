"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const db_connection_1 = __importDefault(require("./db/db.connection"));
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const user_controller_1 = __importDefault(require("./modules/users/user.controller"));
const bootstrap = async () => {
    await (0, db_connection_1.default)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)("dev"));
    app.use("/user", user_controller_1.default);
    app.listen(process.env.PORT, () => {
        console.log(chalk_1.default.bgBlue(`app is running on port ${process.env.PORT}`));
    });
};
exports.bootstrap = bootstrap;
