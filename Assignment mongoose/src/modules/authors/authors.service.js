import { Router } from "express";
import * as authors from "./authors.controller.js";

const authorsRouter = Router();


authorsRouter.post("/addauthors", authors.addAuthor);

export { authorsRouter };
