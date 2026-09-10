"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServices = void 0;
const post_model_1 = require("./model/post.model");
const friendRequest_model_1 = require("../users/models/friendRequest.model");
const friendRequest_types_1 = require("../users/types/friendRequest.types");
const post_types_1 = require("./model/post.types");
const user_service_1 = require("../users/user.service");
class postService {
    async createPost({ content, title, privacy, userId, }) {
        const post = await post_model_1.postModel.create({
            content,
            title,
            privacy,
            createdBy: userId,
        });
        return { data: { post } };
    }
    async getPostsByUser({ userId, user, }) {
        const isFriends = await friendRequest_model_1.friendRequestModel.findOne({
            status: friendRequest_types_1.friendRequestEnum.accepted,
            $or: [
                {
                    to: userId,
                    from: user._id,
                },
                {
                    to: user._id,
                    from: userId,
                },
            ],
        });
        const postsPrivacy = [
            {
                privacy: post_types_1.PostPrivacyEnum.public,
            },
        ];
        if (isFriends) {
            postsPrivacy.push({ privacy: post_types_1.PostPrivacyEnum.friends });
        }
        if (userId == user._id) {
            postsPrivacy.push({ privacy: post_types_1.PostPrivacyEnum.friends });
            postsPrivacy.push({ privacy: post_types_1.PostPrivacyEnum.private });
        }
        const posts = await post_model_1.postModel.find({
            createdBy: userId,
            $or: postsPrivacy,
        });
        return {
            data: {
                posts,
            },
        };
    }
    async homePagePosts({ user }) {
        const { user: populatedUser } = await user_service_1.userService.listFriends({ user });
        if (!populatedUser)
            throw new Error("User not found");
        const friends = [
            populatedUser.received.map((friend) => friend._id),
            populatedUser.sent.map((friend) => friend._id),
        ];
        const privacy = [
            {
                privacy: post_types_1.PostPrivacyEnum.public,
            },
            {
                privacy: post_types_1.PostPrivacyEnum.friends,
                createdBy: {
                    $in: friends,
                },
            },
            {
                privacy: post_types_1.PostPrivacyEnum.private,
                createdBy: {
                    $in: user._id,
                },
            },
        ];
        const posts = await post_model_1.postModel.find({
            $or: privacy,
        });
        return { data: posts };
    }
}
exports.postServices = new postService();
