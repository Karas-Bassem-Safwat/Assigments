import { message } from "../../DB/models/message.model.js";
import User from "../../DB/models/user.model.js";

export const sendMessageService = async ({ content, sendTo }, files = []) => {
  if (!sendTo) return { status: 400, data: { message: "sendTo is required" } };

  const receiver = await User.findById(sendTo);
  if (!receiver) return { status: 404, data: { message: "Receiver not found" } };

  const attachment = files.map((file) => file.filename);

  if (!content && attachment.length === 0) {
    return { status: 400, data: { message: "content or attachment is required" } };
  }

  const newMessage = await message.create({ content, attachment, sendTo });
  return { status: 201, data: { message: "Message sent successfully", data: newMessage } };
};

export const getMessagesService = async (userId) => {
  const messages = await message
    .find({ sendTo: userId })
    .sort({ createdAt: -1 });

  return { status: 200, data: messages };
};
