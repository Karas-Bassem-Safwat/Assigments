import { Router } from "express";
import {
  signup,
  login,
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/", authMiddleware, updateUser);
router.delete("/", authMiddleware, deleteUser);
router.get("/", authMiddleware, getUser);

export default router;
