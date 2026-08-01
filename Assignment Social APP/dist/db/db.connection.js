"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.DB_URL);
        console.log(chalk_1.default.bgGreen("✅ MongoDB connected"));
    }
    catch (error) {
        console.log(chalk_1.default.bgRed(`error:${error}`));
    }
};
exports.default = connectDB;
