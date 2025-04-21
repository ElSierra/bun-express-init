import type { Request, Response, NextFunction } from "express";
import { ApiError, isOperationalError } from "../utils/errorHandler";
import { sendErrorResponse } from "../utils/responseHandler";
import { logger } from "../utils/logger";
import config from "../config/config";

/**
 * Handle custom ApiError errors
 */
export const handleApiError = (
  err: ApiError,
  req: Request,
  res: Response
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  logger.error(`[${statusCode}] ${message}`);
  if (!isOperationalError(err) && !config.isProd) {
    logger.error(err.stack || "No stack trace available");
  }

  sendErrorResponse(res, message, err.stack || undefined, statusCode);
};

/**
 * Handle unknown errors
 */
export const handleUnknownError = (
  err: Error | unknown,
  req: Request,
  res: Response
): void => {
  logger.error("Unknown error occurred:");
  if (err instanceof Error) {
    logger.error(err.message);
    if (!config.isProd) {
      logger.error(err.stack || "No stack trace available");
    }
    sendErrorResponse(res, "Internal server error", err.message, 500);
  } else {
    logger.error(String(err));
    sendErrorResponse(res, "Internal server error", String(err), 500);
  }
};

/**
 * Global error handler middleware
 * Must be registered after all routes and middleware
 */
export const errorHandler = (
  err: Error | ApiError | unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // If headers were already sent, let Express handle it
  if (res.headersSent) {
    return next(err);
  }

  // Log request information for debugging
  logger.debug(`Error in ${req.method} ${req.path}`);

  // Handle different types of errors
  if (err instanceof ApiError) {
    handleApiError(err, req, res);
  } else {
    handleUnknownError(err, req, res);
  }
};

/**
 * Not Found (404) middleware handler
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  logger.warn(`Route not found: ${req.method} ${req.path}`);
  sendErrorResponse(
    res,
    `Cannot ${req.method} ${req.path}`,
    "Route not found",
    404
  );
};
