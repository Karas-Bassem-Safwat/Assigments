import bcrypt from "bcrypt";
import User from "../../DB/models/user.model.js";
import redisClient from "../../DB/redis.js";
import { encryptPhone, decryptPhone } from "../../utils/encryption.js";
import { generateOtp, hashOtp, compareOtp } from "../../utils/otp.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { updateEmailTemplate } from "../../utils/emailTemplates.js";

export const getUserService = async (userId) => {
  const user = await User.findById(userId).lean();
  if (!user) return { status: 404, data: { message: "User not found" } };

  user.phone = decryptPhone(user.phone);
  return { status: 200, data: user };
};

export const updateUserService = async (userId, body) => {
  const user = await User.findById(userId);
  if (!user) return { status: 404, data: { message: "User not found" } };

  const { name, email, phone, age } = body;

  if (email && email.toLowerCase() !== user.email) {
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return { status: 409, data: { message: "Email already exists." } };
  }

  const updateData = {};
  if (name)            updateData.name  = name;
  if (email)           updateData.email = email.toLowerCase();
  if (phone)           updateData.phone = encryptPhone(phone);
  if (age !== undefined) updateData.age = age;

  await User.findByIdAndUpdate(userId, updateData);
  return { status: 200, data: { message: "User updated." } };
};

export const updateEmailRequestService = async (userId, { newEmail }) => {
  const user = await User.findById(userId);
  if (!user) return { status: 404, data: { message: "User not found" } };

  const normalizedEmail = newEmail?.toLowerCase();
  if (!normalizedEmail) return { status: 400, data: { message: "New email is required" } };

  if (normalizedEmail === user.email) {
    return { status: 400, data: { message: "New email must be different from the current email." } };
  }

  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) return { status: 409, data: { message: "Email already exists." } };

  const otp = generateOtp();
  const hashedOtp = await hashOtp(otp);
  await redisClient.setEx(`updateEmail:${userId}`, 300, JSON.stringify({ hashedOtp, newEmail: normalizedEmail }));

  await sendEmail({
    to: normalizedEmail,
    subject: "Confirm your new email",
    html: updateEmailTemplate(otp),
  });

  return { status: 200, data: { message: "A verification code was sent to the new email." } };
};

export const confirmUpdateEmailService = async (userId, { otp }) => {
  const user = await User.findById(userId);
  if (!user) return { status: 404, data: { message: "User not found" } };

  const raw = await redisClient.get(`updateEmail:${userId}`);
  if (!raw) {
    return { status: 400, data: { message: "Verification code expired or not found. Please request a new one." } };
  }

  const { hashedOtp, newEmail } = JSON.parse(raw);
  const isMatch = await compareOtp(otp, hashedOtp);
  if (!isMatch) return { status: 400, data: { message: "Invalid verification code." } };

  user.email = newEmail;
  await user.save();
  await redisClient.del(`updateEmail:${userId}`);

  return { status: 200, data: { message: "Email updated successfully.", email: newEmail } };
};

export const updatePasswordService = async (userId, { oldPassword, newPassword }) => {
  const user = await User.findById(userId);
  if (!user) return { status: 404, data: { message: "User not found" } };

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return { status: 401, data: { message: "Old password is incorrect." } };

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { status: 200, data: { message: "Password updated successfully." } };
};

export const deleteUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) return { status: 404, data: { message: "User not found" } };
  return { status: 200, data: { message: "User deleted" } };
};
