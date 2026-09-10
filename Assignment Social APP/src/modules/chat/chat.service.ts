import { isObjectIdOrHexString, Types } from "mongoose";
import { Huser } from "../users/types/user.types";
import { userModel } from "../users/models/user.model";
import { notFound } from "../../utils/error.exceptions";
import { chatModel } from "./models/chat.model";

class Chat {
  async getChat({ user, id }: { user: Huser; id: string | Types.ObjectId }) {
    const friend = await userModel.findById(id);

    if (!friend) {
      throw new notFound("friend not found");
    }

    let chat = await chatModel
      .findOne({
        group: {
          $exists: false,
        },

        participants: {
          $all: [friend._id, user._id],
        },
      })
      .populate("particiants");

    if (!chat) {
      chat = await chatModel.create({
        participants: [friend._id, user._id],
      });
    }
    return { data: { chat } };
    }

}

export const chatService = new Chat();
