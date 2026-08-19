import { userModel } from "./models/user.model";
import {
  cancelFriendRequestData,
  friendRequestReplayData,
  sendFriendRequestData,
} from "./userValidation";
import {
  badRequest,
  notFound,
  Unauthorized,
} from "../../utils/error.exceptions";
import { friendRequestModel } from "./models/friendRequest.model";
import { ObjectId, Types } from "mongoose";
import { friendRequestEnum } from "./types/friendRequest.types";
import { Huser } from "./types/user.types";

class UserService {
  async sendFriendRequest({
    from,
    to,
  }: sendFriendRequestData & { from: string }) {
    if (from == to) {
      throw new badRequest("cannot send to yourself!");
    }

    const reciever = await userModel.findById(to);
    if (!reciever) {
      throw new notFound("user not found");
    }
    const isfriendExist = await friendRequestModel.findOne({
      sattus: {
        $in: [friendRequestEnum.accepted, friendRequestEnum.pendenig],
      },
      $or: [
        { from, to },
        { to: from, from: to },
      ],
    });

    if (isfriendExist) {
      throw new badRequest("friend already exist");
    }

    await friendRequestModel.create({
      from,
      to,
    });

    return { data: {} };
  }

  async friendRequestReplay({
    id,
    status,
    userId,
  }: friendRequestReplayData & { userId: string | Types.ObjectId }) {
    const friendRequest = await friendRequestModel.findById(id);
    if (!friendRequest) {
      throw new notFound("user not found");
    }
    if (friendRequest.to != userId) {
      throw new Unauthorized();
    }
    if (friendRequest.status != friendRequestEnum.pendenig) {
      throw new notFound("request must be pending");
    }

    friendRequest.status = status;
    await friendRequest.save();
    return { data: {} };
  }

  async listfriendRequests({
    userId,
    isTo = true,
  }: {
    userId: string | Types.ObjectId;
    isTo: boolean;
  }) {
    const filter: {
      to?: string | Types.ObjectId;
      from?: string | Types.ObjectId;
      status: friendRequestEnum;
    } = {
      to: userId,
      status: friendRequestEnum.pendenig,
    };

    if (isTo == false) {
      delete filter.to;
      filter.from = userId;
    }
    const friendRequests = await friendRequestModel.find(filter);

    return { data: { friendRequests } };
  }

  async cancelFriendRequest({
    userId,
    id,
  }: cancelFriendRequestData & { userId: Types.ObjectId | string }) {
    const friendReuest = await friendRequestModel.findById(id);
    if (!friendReuest) {
      throw new notFound("friend request not found");
    }

    if (friendReuest.from.toString() != userId.toString()) {
      throw new Unauthorized("Unauthorized to cancel this friend request");
    }

    if (friendReuest.status != friendRequestEnum.pendenig) {
      throw new badRequest("cannot cancel the request");
    }

    friendReuest.status = friendRequestEnum.canceld;
    await friendReuest.save();
  }

  async listFriends({ user }: { user: Huser }) {
    user = await user.populate([
      {
        path: "received",
        populate: [
          {
            path: "from",
            select: "name email ",
          },
        ],
      },
      {
        path: "sent",
        populate: [
          {
            path: "to",
            select: "name email",
          },
        ],
      },
    ]);

    return { user };
  }
}
export const userService = new UserService();
