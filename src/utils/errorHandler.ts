/**
 * Custom API Error class to standardize error handling
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Creates an operational error (expected error)
 */
export const createError = (statusCode: number, message: string): ApiError => {
  return new ApiError(statusCode, message, true);
};

/**
 * Creates a programming error (unexpected error)
 */
export const createProgrammingError = (message: string): ApiError => {
  return new ApiError(500, message, false);
};

/**
 * Determines if error is an operational error (expected)
 */
export const isOperationalError = (error: unknown): boolean => {
  if (error instanceof ApiError) {
    return error.isOperational;
  }
  return false;
};
