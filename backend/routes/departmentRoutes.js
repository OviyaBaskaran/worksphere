import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/",verifyToken, getAllDepartments);

router.get("/:id",verifyToken, getDepartmentById);

router.post("/",verifyToken, createDepartment);

router.put("/:id",verifyToken, updateDepartment);

router.delete("/:id",verifyToken, deleteDepartment);

export default router;