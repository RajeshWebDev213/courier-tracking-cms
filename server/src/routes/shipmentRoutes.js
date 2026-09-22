import express from "express"
import {createShipment, getAllShipments,getShipmentById,updateShipment,deleteShipment} from "../controller/shipmentController.js"

import { UpdateTracking, updateShipmentStatus } from "../controller/trackingController.js";
const router = express.Router();

router.post("/",createShipment);
router.get("/",getAllShipments);
router.get("/:id",getShipmentById);
router.put("/:id",updateShipment);
router.delete("/:id",deleteShipment);

router.post("/:id/tracking",UpdateTracking);
router.patch("/:id/status",updateShipmentStatus);
export default router;