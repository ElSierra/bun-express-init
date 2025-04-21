import type { Response } from "express";

/**
 * Standard API response structure
 */
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
}

/**
 * Sends a standardized API response
 *
 * @param res Express response object
 * @param statusCode HTTP status code
 * @param success Whether the request was successful
 * @param message Response message
 * @param data Optional data to include in the response
 * @param error Optional error message
 */
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
  error?: string
): void => {
  const responseBody: ApiResponse<T> = {
    success,
    message,
    statusCode,
    ...(data !== undefined && { data }),
    ...(error !== undefined && { error }),
  };

  res.status(statusCode).json(responseBody);
};

/**
 * Sends a success response
 *
 * @param res Express response object
 * @param message Success message
 * @param data Optional data to include in the response
 * @param statusCode HTTP status code (default: 200)
 */
export const sendSuccessResponse = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200
): void => {
  sendResponse(res, statusCode, true, message, data);
};

/**
 * Sends an error response
 *
 * @param res Express response object
 * @param message Error message
 * @param error Optional detailed error information
 * @param statusCode HTTP status code (default: 400)
 */
export const sendErrorResponse = (
  res: Response,
  message: string,
  error?: string,
  statusCode = 400
): void => {
  sendResponse(res, statusCode, false, message, undefined, error);
};
