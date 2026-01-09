import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/debug/users", getUsers); // Add this for debugging

export default router;