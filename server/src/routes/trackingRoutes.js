import express from "express"
import { getTrackingByNumber } from "../controller/trackingController.js";
const router = express.Router();

router.get("/:trackingNumber",getTrackingByNumber);

export default router;