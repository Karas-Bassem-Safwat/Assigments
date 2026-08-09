"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOTP = void 0;
const createOTP = () => {
    return Math.ceil(Math.random() * 1000000);
};
exports.createOTP = createOTP;
