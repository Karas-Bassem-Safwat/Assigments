import { Router } from "express";
import { signupService, loginService } from "./auth.service.js";

const router = Router();

// POST /auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { status, data } = await signupService(req.body);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { status, data } = await loginService(req.body);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
