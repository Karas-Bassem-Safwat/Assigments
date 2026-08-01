import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Auth, noContent } from "../utils/error.exceptions";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const authMiddleware = (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
  const token = req.headers.get("token") || req.headers.get("authorization");
  if (!token) return new noContent() ;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETv as string) as jwt.JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch {
    throw new Auth();
  }
};

export default authMiddleware;
