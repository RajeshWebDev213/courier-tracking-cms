import express from "express";

import {
  getAdminSettings,
  updateAdminProfile,
  changeAdminPassword,
} from "../controller/adminSettingsController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get admin profile
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAdminSettings
);

// Update name and email
router.put(
  "/profile",
  authMiddleware,
  adminMiddleware,
  updateAdminProfile
);

// Change password
router.put(
  "/password",
  authMiddleware,
  adminMiddleware,
  changeAdminPassword
);

export default router;