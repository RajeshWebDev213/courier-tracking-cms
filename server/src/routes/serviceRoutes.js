import express from "express";

import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controller/serviceController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Admin routes
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createService
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateService
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteService
);

export default router;