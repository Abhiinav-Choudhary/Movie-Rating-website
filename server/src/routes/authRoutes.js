import express from "express";
import { signup, signin, profile, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddlewar.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", protect, profile);
router.post("/logout", logout);  

export default router;
