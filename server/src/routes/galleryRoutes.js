import express from "express"
import upload from "../middleware/uploadMiddleware.js"
import { getGallery,createGallery,deleteGallery } from "../controller/galleryController.js"

const router = express.Router();

router.get("/",getGallery);
router.post("/",upload.single("image"),createGallery);
router.delete("/:id",deleteGallery);


export default router;