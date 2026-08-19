import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "../db/redis.connection";
import { Auth, noContent } from "../utils/error.exceptions";
import { Huser } from "../modules/users/types/user.types";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: number;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: Huser;
  }
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const rawAuth = req.headers["authorization"] as string | undefined;
  const token =
    (req.headers["token"] as string | undefined) ||
    (rawAuth?.startsWith("Bearer ") ? rawAuth.slice(7) : rawAuth);

  if (!token) {
    return next(new noContent("No authentication token provided"));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;

    const blacklisted = await isTokenBlacklisted(decoded.jti ?? token);
    if (blacklisted) {
      return next(new Auth("Token has been invalidated. Please log in again."));
    }

    req.userId = decoded.userId as string;
    req.userRole = decoded.role as number;

    next();
  } catch {
    next(new Auth("Invalid or expired token"));
  }
};

export default authMiddleware;
