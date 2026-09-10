import { Router } from "express";
import { validation } from "../../middleware/validation.middleware";
import * as userValidatoin from "./userValidation";
import authMiddleware from "../../middleware/auth.middleware";
import { userService } from "./user.service";
import { ObjectId, Types } from "mongoose";

import chatRouter from "../chat/chat.controller";
const router = Router();

export const routes = {
  base: "/users",
  sendFriendRequest: "/send-friend-request",
  friendRequestReplay: "/reply-friend-request/:id",
  listFriendRequest: "/list-friend-request",
  cacnelFriendRequest: "/cancel-friend-request/:id",
  listFriends: "/list-friends",
};

router.use("/:id/chat", chatRouter);
router.post(
  routes.sendFriendRequest,
  validation(userValidatoin.sendFriendRequestSchema),
  authMiddleware,
  async (req, res) => {
    const { to } = req.body as userValidatoin.sendFriendRequestData;
    const { id: from } = req.user;
    await userService.sendFriendRequest({ to, from });

    return res.status(202).json({ message: "Success" });
  },
);

router.patch(
  routes.friendRequestReplay,
  validation(userValidatoin.friendRequestReplay),
  authMiddleware,
  async (req, res) => {
    const { id } = req.params as { id: string };
    const { status } = req.body;
    const userId = req.user?._id as Types.ObjectId;
    await userService.friendRequestReplay({ id, status, userId });
    return res.status(202).json({ message: "Success" });
  },
);

router.get(routes.listFriendRequest, async (req, res) => {
  const userId = req.user._id as Types.ObjectId;
  const { isTo = true } = req.query;
  const { data } = await userService.listfriendRequests({
    userId,
    isTo: JSON.parse(isTo as string),
  });

  return res.status(200).json({ data });
});

router.patch(
  routes.cacnelFriendRequest,
  authMiddleware,
  validation(userValidatoin.cancelFriendRequest),
  async (req, res) => {
    const { id } = req.params;
    const userId = req.user!._id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    await userService.cancelFriendRequest({
      id,
      userId,
    });

    return res.status(200).json({ message: "Canceld" });
  },
);

router.get(routes.listFriends, authMiddleware, async (req, res) => {
  const user = req.user;
  const data = await userService.listFriends({ user });
  return res.status(200).json({ message: `friends :\n ${data} ` });
});
export default router;
