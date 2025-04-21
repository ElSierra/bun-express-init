import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/auth";
import { sendSuccessResponse } from "../utils/responseHandler";

const router = express.Router();

/**
 * @route GET /api/users/profile
 * @description Get current user profile
 * @access Private (requires authentication)
 */
router.get("/profile", authenticateToken, (req, res) => {
  sendSuccessResponse(res, "Profile retrieved successfully", {
    user: req.user,
  });
});

/**
 * @route GET /api/users/admin
 * @description Admin only endpoint
 * @access Private (requires admin role)
 */
router.get(
  "/admin",
  authenticateToken,
  authorizeRoles(["admin"]),
  (req, res) => {
    sendSuccessResponse(res, "Admin access granted", {
      message: "This is a protected admin route",
    });
  }
);

export default router;
