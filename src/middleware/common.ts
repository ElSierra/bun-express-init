import express from "express";
import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/**
 * Apply common middleware to Express application
 * @param app Express application instance
 */
export const applyCommonMiddleware = (app: Express): void => {
  // Parse JSON request body
  app.use(express.json());

  // Parse URL-encoded request body
  app.use(express.urlencoded());

  // Enable CORS
  app.use(cors());

  // Set security headers
  app.use(helmet());

  // HTTP request logger
  app.use(morgan("dev"));
};
