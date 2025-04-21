import type { Request, Response, NextFunction } from "express";
import { generateTokens, verifyRefreshToken } from "../utils/jwt";
import { sendSuccessResponse } from "../utils/responseHandler";
import { ApiError, createError } from "../utils/errorHandler";

/**
 * Login user and issue tokens
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
export const login = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { username, password } = req.body;

    // In a real application, you would verify credentials against a database
    // This is a simplified example
    if (username === "demo@example.com" && password === "demo123") {
      // Create payload with user information
      const userPayload = {
        userId: "12345",
        email: username,
        role: "user",
      };

      // Generate tokens
      const tokens = generateTokens(userPayload);

      sendSuccessResponse(res, "Login successful", {
        user: {
          id: userPayload.userId,
          email: userPayload.email,
          role: userPayload.role,
        },
        tokens,
      });
    } else {
      // Instead of handling error here, forward it to the global error handler
      next(createError(401, "Invalid credentials"));
    }
  } catch (error) {
    // Forward any caught errors to the global error handler
    next(error);
  }
};

/**
 * Refresh access token using refresh token
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(createError(400, "Refresh token is required"));
    }

    const decodedRefreshToken = verifyRefreshToken(refreshToken);

    if (!decodedRefreshToken) {
      return next(createError(401, "Invalid or expired refresh token"));
    }

    // Generate new tokens
    const tokens = generateTokens({
      userId: decodedRefreshToken.userId,
      email: decodedRefreshToken.email,
      role: decodedRefreshToken.role,
    });

    sendSuccessResponse(res, "Token refreshed successfully", { tokens });
  } catch (error) {
    // Forward any caught errors to the global error handler
    next(error);
  }
};
