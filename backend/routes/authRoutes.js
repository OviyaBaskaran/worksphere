import express from "express";
import { registerAdmin,loginAdmin,refreshAccessToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/refresh",refreshAccessToken);
export default router;