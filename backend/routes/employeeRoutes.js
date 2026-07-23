import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { 
  getAllEmployees,
  getEmployeeById,
  createEmployee,updateEmployee,deleteEmployee
} from "../controllers/employeeController.js";

const router = express.Router();


router.get("/",verifyToken, getAllEmployees);

router.get("/:id",verifyToken, getEmployeeById);

router.post("/",verifyToken, createEmployee);

router.put("/:id",verifyToken, updateEmployee);

router.delete("/:id",verifyToken, deleteEmployee);

export default router;