import express from "express";
import config from "./src/config/config";
import { applyCommonMiddleware } from "./src/middleware/common";
import { sendSuccessResponse } from "./src/utils/responseHandler";
import { logger } from "./src/utils/logger";
import { errorHandler, notFoundHandler } from "./src/middleware/errorHandler";
import authRoutes from "./src/routes/auth.routes";
import userRoutes from "./src/routes/user.routes";

// Create Express application
const app = express();

// Apply common middleware
applyCommonMiddleware(app);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Define a basic route
app.get("/", (req, res) => {
  sendSuccessResponse(res, "Welcome to Bun-Express-Backend API", {
    version: "1.0.0",
    environment: config.env,
  });
});

// Handle 404 errors for undefined routes
app.use(notFoundHandler);

// Global error handler - must be registered last
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  logger.server(`Server running on port ${config.port} in ${config.env} mode`);
  logger.info(`http://localhost:${config.port}`);

  if (config.isProd) {
    logger.important(
      "Production mode is active - logging will be minimal unless ENABLE_LOGS=true"
    );
  } else {
    logger.debug("Debug logging is enabled in development mode");
  }
});
