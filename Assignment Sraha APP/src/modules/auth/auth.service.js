import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../../DB/models/user.model.js";

export const signupService = async ({ name, email, password, phone, age }) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return { status: 409, data: { message: "Email already exists." } };

  const hashedPassword = await bcrypt.hash(password, 10);
  const encryptedPhone = CryptoJS.AES.encrypt(phone, process.env.CRYPTO_SECRET).toString();

  await User.create({ name, email, password: hashedPassword, phone: encryptedPhone, age });
  return { status: 201, data: { message: "User added successfully." } };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return { status: 401, data: { message: "Invalid email or password" } };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { status: 401, data: { message: "Invalid email or password" } };

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return { status: 200, data: { message: "Login successful", token } };
};
