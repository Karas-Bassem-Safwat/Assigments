"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const auth_service_1 = require("./auth.service");
const aut_validation_1 = require("./aut.validation");
const router = (0, express_1.Router)();
router.post("/signup", (0, validation_middleware_1.validation)(aut_validation_1.signUpSchema), async (req, res, next) => {
    try {
        const result = await auth_service_1.authService.signUP(req.body);
        res.status(201).json({
            success: true,
            statusCode: 201,
            ...result,
        });
    }
    catch (error) {
        next(error);
    }
});
router.post("/verify-otp", (0, validation_middleware_1.validation)(aut_validation_1.verifyOtpSchema), async (req, res, next) => {
    try {
        const result = await auth_service_1.authService.verifyOTP(req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            ...result,
        });
    }
    catch (error) {
        next(error);
    }
});
router.post("/login", (0, validation_middleware_1.validation)(aut_validation_1.loginSchema), async (req, res, next) => {
    try {
        const result = await auth_service_1.authService.login(req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            ...result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
