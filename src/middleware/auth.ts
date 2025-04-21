import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { createError } from "../utils/errorHandler";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role?: string;
        [key: string]: any;
      };
    }
  }
}

/**
 * Middleware to authenticate JWT token
 * Verifies the access token in the Authorization header
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN format

    if (!token) {
      return next(createError(401, "Access denied. No token provided"));
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return next(createError(401, "Invalid or expired token"));
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to authorize based on user roles
 * Must be used after authenticateToken
 *
 * @param roles Array of allowed roles
 */
export const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        return next(createError(401, "Authentication required"));
      }

      const userRole = req.user.role;
      if (!userRole || !roles.includes(userRole)) {
        return next(
          createError(403, "Access denied. Insufficient permissions")
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
