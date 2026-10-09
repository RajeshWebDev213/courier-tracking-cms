import express from "express"
import {createShipment, getAllShipments,getShipmentById,updateShipment,deleteShipment,getMyShipments} from "../controller/shipmentController.js"
import auth from "../middleware/authMiddleware.js";
import { UpdateTracking, updateShipmentStatus } from "../controller/trackingController.js";
const router = express.Router();

router.post("/",auth,createShipment);
router.get("/my",auth,getMyShipments)
router.get("/",getAllShipments);
router.get("/:trackingNumber", auth, getShipmentById);
router.put("/:id",updateShipment);
router.delete("/:id",deleteShipment);

router.post("/:id/tracking",UpdateTracking);
router.patch("/:id/status",updateShipmentStatus);
export default router;