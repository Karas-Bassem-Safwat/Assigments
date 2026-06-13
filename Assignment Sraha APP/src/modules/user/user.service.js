import CryptoJS from "crypto-js";
import User from "../../DB/models/user.model.js";

const decryptPhone = (enc) => {
  const bytes = CryptoJS.AES.decrypt(enc, process.env.CRYPTO_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const encryptPhone = (phone) =>
  CryptoJS.AES.encrypt(phone, process.env.CRYPTO_SECRET).toString();

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

export const deleteUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) return { status: 404, data: { message: "User not found" } };
  return { status: 200, data: { message: "User deleted" } };
};
