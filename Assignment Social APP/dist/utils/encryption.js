"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPhone = exports.encryptPhone = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const encryptPhone = (phone) => crypto_js_1.default.AES.encrypt(phone, process.env.CRYPTO_SECRET).toString();
exports.encryptPhone = encryptPhone;
const decryptPhone = (encryptedPhone) => {
    const bytes = crypto_js_1.default.AES.decrypt(encryptedPhone, process.env.CRYPTO_SECRET);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
};
exports.decryptPhone = decryptPhone;
