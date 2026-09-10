import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { chatService } from "./chat.service";
import { Types } from "mongoose";

const  router = Router();

export const routes = {
  base: "/chats",
  getChat: "/",
};

router.get(routes.getChat, authMiddleware, async (req, res) => {
  const { user } = req;
  const id = req.params.id as string;
  const data = chatService.getChat({ user, id });
  return res.status(200).json({ data });
});

export default router;
