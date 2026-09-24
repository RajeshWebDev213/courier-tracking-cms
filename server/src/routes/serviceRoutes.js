import express from "express"
import { getService,createService,updateService,deleteService } from "../controller/serviceController.js"

const router = express.Router();

router.get("/",getService)
router.post("/",createService);
router.put("/:id",updateService);
router.delete("/:id",deleteService);

export default router;