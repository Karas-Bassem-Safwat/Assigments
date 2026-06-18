import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const encryptPhone = (phone) =>
  CryptoJS.AES.encrypt(phone, process.env.CRYPTO_SECRET).toString();

export const decryptPhone = (encryptedPhone) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPhone, process.env.CRYPTO_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const encryptedPhone = encryptPhone(phone);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: encryptedPhone,
      age,
    });

    res.status(201).json({ message: "User added successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, phone, age } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email.toLowerCase() !== user.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        return res.status(409).json({ message: "Email already exists." });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (phone) updateData.phone = encryptPhone(phone);
    if (age !== undefined) updateData.age = age;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json({ message: "User updated." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.phone = decryptPhone(user.phone);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
