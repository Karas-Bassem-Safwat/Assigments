import { NextFunction, Request, Response, Router } from "express";
import { validation } from "../../middleware/validation.middleware";
import { authService } from "./auth.service";
import { loginSchema, signUpSchema, verifyOtpSchema } from "./aut.validation";

const router = Router();

// ─── POST /auth/signup ───────────────────────────────────────────────────────
router.post(
  "/signup",
  validation(signUpSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.signUP(req.body);
      res.status(201).json({
        success: true,
        statusCode: 201,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
);

// ─── POST /auth/verify-otp ───────────────────────────────────────────────────
router.post(
  "/verify-otp",
  validation(verifyOtpSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.verifyOTP(req.body);
      res.status(200).json({
        success: true,
        statusCode: 200,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
);

// ─── POST /auth/login ────────────────────────────────────────────────────────
router.post(
  "/login",
  validation(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({
        success: true,
        statusCode: 200,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
