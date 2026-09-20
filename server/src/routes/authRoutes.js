import express from "express"
import {register, login , logout, getme} from "../controller/authController.js"
import auth from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",auth,logout);
router.get("/me", auth, getme);
export default router;