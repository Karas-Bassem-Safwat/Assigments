import { Types } from "mongoose";
import { createPostData } from "./post.validation";
import { postModel } from "./model/post.model";
import { number } from "zod";
import { Huser } from "../users/types/user.types";
import { friendRequestModel } from "../users/models/friendRequest.model";
import { friendRequestEnum } from "../users/types/friendRequest.types";
import { PostPrivacyEnum } from "./model/post.types";
import { userService } from "../users/user.service";

class postService {
  async createPost({
    content,
    title,
    privacy,
    userId,
  }: createPostData & { userId: string | Types.ObjectId }) {
    const post = await postModel.create({
      content,
      title,
      privacy,
      createdBy: userId,
    });
    return { data: { post } };
  }

  async getPostsByUser({
    userId,
    user,
  }: {
    userId: string | Types.ObjectId;
    user: Huser;
  }) {
    const isFriends = await friendRequestModel.findOne({
      status: friendRequestEnum.accepted,
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
        privacy: PostPrivacyEnum.public,
      },
    ];
    if (isFriends) {
      postsPrivacy.push({ privacy: PostPrivacyEnum.friends });
    }
    if (userId == user._id) {
      postsPrivacy.push({ privacy: PostPrivacyEnum.friends });
      postsPrivacy.push({ privacy: PostPrivacyEnum.private });
    }
    const posts = await postModel.find({
      createdBy: userId,
      $or: postsPrivacy,
    });
    return {
      data: {
        posts,
      },
    };
  }

  async homePagePosts({ user }: { user: Huser }) {
    const { user: populatedUser } = await userService.listFriends({ user });
    if (!populatedUser) throw new Error("User not found");
    const friends = [
      populatedUser.received.map((friend) => friend._id),
      populatedUser.sent.map((friend) => friend._id),
    ];
    const privacy = [
      {
        privacy: PostPrivacyEnum.public,
      },
      {
        privacy: PostPrivacyEnum.friends,
        createdBy: {
          $in: friends,
        },
      },
      {
        privacy: PostPrivacyEnum.private,
        createdBy: {
          $in: user._id,
        },
      },
    ];

    const posts = await postModel.find({
      $or: privacy,
    } as any);
    return { data: posts };
  }
}

export const postServices = new postService();
