"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const encrypt = (data) => {
    const ecryptData = crypto_js_1.default.AES.encrypt(data, process.env.ENC_KEY).toString();
    return ecryptData;
};
exports.encrypt = encrypt;
const decrypt = (data) => {
    const decryptedData = crypto_js_1.default.AES.decrypt(data, process.env.ENC_KEY);
    return decryptedData;
};
exports.decrypt = decrypt;
