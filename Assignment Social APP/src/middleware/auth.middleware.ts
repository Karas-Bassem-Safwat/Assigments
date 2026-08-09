import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "../db/redis.connection";
import { Auth, noContent } from "../utils/error.exceptions";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: number;
}

/**
 * Protects routes that require a valid JWT.
 *
 * Accepts the token from:
 *   - Header:  `token: <jwt>`
 *   - Header:  `authorization: Bearer <jwt>`
 */
const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // 1. Extract token from headers
  const rawAuth = req.headers["authorization"] as string | undefined;
  const token =
    (req.headers["token"] as string | undefined) ||
    (rawAuth?.startsWith("Bearer ") ? rawAuth.slice(7) : rawAuth);

  if (!token) {
    return next(new noContent("No authentication token provided"));
  }

  try {
    // 2. Verify signature
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    // 3. Check if token has been blacklisted (logout)
    const blacklisted = await isTokenBlacklisted(decoded.jti ?? token);
    if (blacklisted) {
      return next(new Auth("Token has been invalidated. Please log in again."));
    }

    // 4. Attach user info to request
    req.userId   = decoded.userId as string;
    req.userRole = decoded.role   as number;

    next();
  } catch {
    next(new Auth("Invalid or expired token"));
  }
};

export default authMiddleware;
