import express from "express";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

import auth from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", auth, adminMiddleware, getAllUsers);

router.get("/:id", auth, adminMiddleware, getUserById);

router.put("/:id", auth, adminMiddleware, updateUser);

router.delete("/:id", auth, adminMiddleware, deleteUser);

export default router;