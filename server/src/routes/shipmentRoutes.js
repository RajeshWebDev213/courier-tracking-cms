import express from "express";

import {
  createShipment,
  getAllShipments,
  getShipmentById,
  getShipmentByTrackingNumber,
  updateShipment,
  deleteShipment,
  getMyShipments,
} from "../controller/shipmentController.js";

import auth from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  UpdateTracking,
  getTrackingByNumber,
} from "../controller/trackingController.js";

const router = express.Router();

router.post(
  "/",
  auth,
  createShipment
);

router.get(
  "/my",
  auth,
  getMyShipments
);



router.get(
  "/track/:trackingNumber",
  getTrackingByNumber
);

router.get(
  "/tracking/:trackingNumber",
  auth,
  getShipmentByTrackingNumber
);



// Get all shipments
router.get(
  "/",
  auth,
  adminMiddleware,
  getAllShipments
);


router.get(
  "/:id",
  auth,
  adminMiddleware,
  getShipmentById
);


router.put(
  "/:id",
  auth,
  adminMiddleware,
  updateShipment
);


router.delete(
  "/:id",
  auth,
  adminMiddleware,
  deleteShipment
);


router.patch(
  "/:id/tracking",
  auth,
  adminMiddleware,
  UpdateTracking
);


export default router;