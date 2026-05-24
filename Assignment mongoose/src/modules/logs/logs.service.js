import { Router } from "express";
import * as logs from "./logs.controller.js";

const logsRouter = Router();


logsRouter.post("/", logs.addLog);

export { logsRouter };
