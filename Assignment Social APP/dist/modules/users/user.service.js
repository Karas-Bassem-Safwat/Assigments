"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./models/user.model");
const error_exceptions_1 = require("../../utils/error.exceptions");
const friendRequest_model_1 = require("./models/friendRequest.model");
const friendRequest_types_1 = require("./types/friendRequest.types");
class UserService {
    async sendFriendRequest({ from, to, }) {
        if (from == to) {
            throw new error_exceptions_1.badRequest("cannot send to yourself!");
        }
        const reciever = await user_model_1.userModel.findById(to);
        if (!reciever) {
            throw new error_exceptions_1.notFound("user not found");
        }
        const isfriendExist = await friendRequest_model_1.friendRequestModel.findOne({
            sattus: {
                $in: [friendRequest_types_1.friendRequestEnum.accepted, friendRequest_types_1.friendRequestEnum.pendenig],
            },
            $or: [
                { from, to },
                { to: from, from: to },
            ],
        });
        if (isfriendExist) {
            throw new error_exceptions_1.badRequest("friend already exist");
        }
        await friendRequest_model_1.friendRequestModel.create({
            from,
            to,
        });
        return { data: {} };
    }
    async friendRequestReplay({ id, status, userId, }) {
        const friendRequest = await friendRequest_model_1.friendRequestModel.findById(id);
        if (!friendRequest) {
            throw new error_exceptions_1.notFound("user not found");
        }
        if (friendRequest.to != userId) {
            throw new error_exceptions_1.Unauthorized();
        }
        if (friendRequest.status != friendRequest_types_1.friendRequestEnum.pendenig) {
            throw new error_exceptions_1.notFound("request must be pending");
        }
        friendRequest.status = status;
        await friendRequest.save();
        return { data: {} };
    }
    async listfriendRequests({ userId, isTo = true, }) {
        const filter = {
            to: userId,
            status: friendRequest_types_1.friendRequestEnum.pendenig,
        };
        if (isTo == false) {
            delete filter.to;
            filter.from = userId;
        }
        const friendRequests = await friendRequest_model_1.friendRequestModel.find(filter);
        return { data: { friendRequests } };
    }
    async cancelFriendRequest({ userId, id, }) {
        const friendReuest = await friendRequest_model_1.friendRequestModel.findById(id);
        if (!friendReuest) {
            throw new error_exceptions_1.notFound("friend request not found");
        }
        if (friendReuest.from.toString() != userId.toString()) {
            throw new error_exceptions_1.Unauthorized("Unauthorized to cancel this friend request");
        }
        if (friendReuest.status != friendRequest_types_1.friendRequestEnum.pendenig) {
            throw new error_exceptions_1.badRequest("cannot cancel the request");
        }
        friendReuest.status = friendRequest_types_1.friendRequestEnum.canceld;
        await friendReuest.save();
    }
    async listFriends({ user }) {
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
exports.userService = new UserService();
