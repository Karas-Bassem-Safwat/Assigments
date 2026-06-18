import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../DB/models/user.model.js";
import Otp from "../../DB/models/otp.model.js";
import { encryptPhone } from "../../utils/encryption.js";
import { generateOtp, hashOtp, compareOtp } from "../../utils/otp.js";
import { sendEmail } from "../../utils/sendEmail.js";

export const signupService = async ({ name, email, password, phone, age }) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return { status: 409, data: { message: "Email already exists." } };

  const hashedPassword = await bcrypt.hash(password, 10);
  const encryptedPhone = encryptPhone(phone);

  const newUser = await User.create({ name, email, password: hashedPassword, phone: encryptedPhone, age });

  const otp = generateOtp();
  const hashedOtp = await hashOtp(otp);
  await Otp.create({ userId: newUser._id, otp: hashedOtp });

  await sendEmail({
    to: newUser.email,
    subject: "Verify your email",
    html: `<h2>Your verification code is: ${otp}</h2><p>This code expires in 5 minutes.</p>`,
  });

  return { status: 201, data: { message: "User added successfully. A verification code was sent to your email." } };
};

export const confirmEmailService = async ({ email, otp }) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return { status: 404, data: { message: "User not found" } };
  if (user.confirmEmail) return { status: 400, data: { message: "Email is already verified." } };

  const otpDoc = await Otp.findOne({ userId: user._id });
  if (!otpDoc) {
    return { status: 400, data: { message: "Verification code expired or not found. Please request a new one." } };
  }

  const isMatch = await compareOtp(otp, otpDoc.otp);
  if (!isMatch) return { status: 400, data: { message: "Invalid verification code." } };

  user.confirmEmail = true;
  await user.save();
  await Otp.deleteOne({ _id: otpDoc._id });

  return { status: 200, data: { message: "Email verified successfully." } };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return { status: 401, data: { message: "Invalid email or password" } };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { status: 401, data: { message: "Invalid email or password" } };

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return { status: 200, data: { message: "Login successful", token } };
};
