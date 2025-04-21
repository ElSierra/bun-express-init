import express from "express";
import * as AuthController from "../controllers/auth.controller";

const router = express.Router();

/**
 * @route POST /api/auth/login
 * @description Authenticate user and generate tokens
 * @access Public
 */
router.post("/login", AuthController.login);

/**
 * @route POST /api/auth/refresh
 * @description Refresh access token using refresh token
 * @access Public
 */
router.post("/refresh", AuthController.refreshToken);

export default router;
