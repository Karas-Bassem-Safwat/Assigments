import jwt from "jsonwebtoken";

export const generateToken = (
  payload: string|object,
  secretKey = process.env.JWT_SECRET as string,
  options = {},
) => {
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

export const verifyToken = (
  token: string,
  secretKey = process.env.JWT_SECRET as string,
  options = {},
) => {
  const payload = jwt.verify(token, secretKey, options);
  return payload;
};
