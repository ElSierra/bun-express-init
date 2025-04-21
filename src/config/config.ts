import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Environment
const env = process.env.NODE_ENV || "development";

// Local development configuration (hardcoded values)
const localConfig = {
  env: "development",
  isDev: true,
  isProd: false,
  port: 3000,

  // JWT Configuration
  jwt: {
    accessTokenSecret: "local-dev-access-secret-key",
    accessTokenExpiry: "1h",
    refreshTokenSecret: "local-dev-refresh-secret-key",
    refreshTokenExpiry: "7d",
  },
};

// Production configuration (from .env)
const productionConfig = {
  env: "production",
  isDev: false,
  isProd: true,
  port: process.env.PORT || 3000,

  // JWT Configuration
  jwt: {
    accessTokenSecret:
      process.env.JWT_ACCESS_TOKEN_SECRET || "fallback-access-secret",
    accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY || "15m",
    refreshTokenSecret:
      process.env.JWT_REFRESH_TOKEN_SECRET || "fallback-refresh-secret",
    refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || "7d",
  },
};

// Select the appropriate configuration based on environment
const config = env === "production" ? productionConfig : localConfig;

export default config;
