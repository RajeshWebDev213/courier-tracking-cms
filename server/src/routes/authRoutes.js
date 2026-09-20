import express from "express"
import {signup, login , logout} from "../controller/authController.js"
import auth from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",auth,logout);

export default router;