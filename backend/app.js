import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";


const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

/* ===========================
   Middleware
=========================== */

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());


/* ===========================
   Routes
=========================== */

app.use("/api/auth", authRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/departments", departmentRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/profile", profileRoutes);


/* ===========================
   Test Route
=========================== */

app.get("/", (req, res) => {

  res.send("WorkSphere Backend is Running...");

});


export default app;
