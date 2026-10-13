import express from "express"
import upload from "../middleware/uploadMiddleware.js"
import { getGallery,createGallery,updateGallery,deleteGallery } from "../controller/galleryController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
const router = express.Router();

router.get("/",getGallery);
router.post("/",upload.single("image"),createGallery);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateGallery
);
router.delete("/:id",deleteGallery);


export default router;