import express from "express";

import { verifyToken } from "../middleware/authMiddleware.js";

import profileUpload from "../middleware/profileUploadMiddleware.js";

import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/profileController.js";


const router = express.Router();



router.get(
  "/",
  verifyToken,
  getUserProfile
);



router.put(
  "/",
  verifyToken,
  profileUpload.single("photo"),
  updateUserProfile
);



router.put(
  "/password",
  verifyToken,
  changePassword
);



export default router;