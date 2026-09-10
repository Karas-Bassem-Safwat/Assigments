import z from "zod";
import { Gender } from "../users/types/user.types";
export const signUpSchema = {
  body: z.object({
    name: z.string().min(2).max(50),
    email: z.email(),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W]).{8,}$/,
        "Password must be at least 8 characters with uppercase, lowercase, and a special character",
      ),
    age: z.number().min(13).max(120).optional(),
    gender: z.union([z.literal(Gender.male), z.literal(Gender.female)]),
    bio: z.string().max(300),
    phone: z.string().min(7).max(20),
  }),
};

export const verifyOtpSchema = {
  body: z.object({
    userId: z.string().min(1),
    otp: z.number().int().min(1).max(999999),
  }),
};

export const loginSchema = {
  body: z.object({
    email: z.email(),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W]).{8,}$/,
        "Invalid password format",
      ),
  }),
};

export type SignUpType = z.infer<typeof signUpSchema.body>;
export type VerifyOtpType = z.infer<typeof verifyOtpSchema.body>;
export type loginType = z.infer<typeof loginSchema.body>;
