import jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";
import config from "../config/config";

// JWT configuration
const JWT_CONFIG = {
  accessToken: {
    secret: config.jwt?.accessTokenSecret || "access-token-default-secret",
    expiresIn: config.jwt?.accessTokenExpiry || "15m",
  },
  refreshToken: {
    secret: config.jwt?.refreshTokenSecret || "refresh-token-default-secret",
    expiresIn: config.jwt?.refreshTokenExpiry || "7d",
  },
};

interface TokenPayload {
  userId: string;
  [key: string]: any;
}

/**
 * Generate an access token
 * @param payload User data to encode in the token
 * @returns Access token
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    JWT_CONFIG.accessToken.secret as Secret,
    {
      expiresIn: JWT_CONFIG.accessToken.expiresIn,
    } as SignOptions
  );
};

/**
 * Generate a refresh token
 * @param payload User data to encode in the token
 * @returns Refresh token
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    JWT_CONFIG.refreshToken.secret as Secret,
    {
      expiresIn: JWT_CONFIG.refreshToken.expiresIn,
    } as SignOptions
  );
};

/**
 * Verify an access token
 * @param token Access token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(
      token,
      JWT_CONFIG.accessToken.secret as Secret
    ) as TokenPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Verify a refresh token
 * @param token Refresh token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(
      token,
      JWT_CONFIG.refreshToken.secret as Secret
    ) as TokenPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Generate both access and refresh tokens
 * @param payload User data to encode in the tokens
 * @returns Object containing both tokens
 */
export const generateTokens = (
  payload: TokenPayload
): { accessToken: string; refreshToken: string } => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};
