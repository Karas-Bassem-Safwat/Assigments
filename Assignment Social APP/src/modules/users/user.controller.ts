import { Router } from "express";
import { signup } from "./user.service";
const router = Router()

router.post("/signup",signup)

export default router