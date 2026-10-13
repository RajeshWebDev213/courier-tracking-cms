import express from "express";

import auth from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAdminDashboard,
} from "../controller/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  auth,
  adminMiddleware,
  getAdminDashboard
);

export default router;