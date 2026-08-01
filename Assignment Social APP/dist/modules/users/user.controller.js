"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("./user.service");
const router = (0, express_1.Router)();
router.post("/signup", user_service_1.signup);
exports.default = router;
