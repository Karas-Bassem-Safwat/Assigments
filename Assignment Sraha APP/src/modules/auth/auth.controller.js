import { Router } from "express";
import { signupService, loginService, confirmEmailService } from "./auth.service.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { status, data } = await signupService(req.body);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/confirm-email", async (req, res) => {
  try {
    const { status, data } = await confirmEmailService(req.body);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { status, data } = await loginService(req.body);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
