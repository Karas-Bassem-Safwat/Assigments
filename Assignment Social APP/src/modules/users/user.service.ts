import { userModel } from "./user.model";
import { encryptPhone, decryptPhone } from "../../utils/encryption";
import bcrypt from "bcrypt";
import { NextFunction } from "express";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const { name, email, password, phone, age, gender, role } = req.body;

    const existingUser = await userModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return next(new ConflictError("Email already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const encryptedPhone = encryptPhone(phone);

    
    const newUser = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: encryptedPhone,
      age,
      gender, 
      role,   
    });

    return res.status(201).json({
      message: "User registered successfully",
      newUser,
    });

  } catch (err) {
    return next(err);
  }
};

 