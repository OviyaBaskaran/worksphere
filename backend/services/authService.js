import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

import {
  FIND_ADMIN_BY_EMAIL,
  CREATE_ADMIN,
} from "../sql/adminQueries.js";

export async function registerAdminService(adminData) {

  const {
    fullName,
    email,
    password,
  } = adminData;

  // Validation
  if (!fullName || !email || !password) {
    throw new Error("All fields are required.");
  }

  // Check Existing Email
  const [existingAdmin] = await pool.execute(
    FIND_ADMIN_BY_EMAIL,
    [email]
  );

  if (existingAdmin.length > 0) {
    throw new Error("Email already exists.");
  }

  // Hash Password
  const passwordHash = await bcrypt.hash(password, 10);

  // Save Admin
  await pool.execute(
    CREATE_ADMIN,
    [
      fullName,
      email,
      passwordHash,
    ]
  );

  return {
    message: "Admin Registered Successfully",
  };

}

export async function loginAdminService(loginData) {

  const { email, password } = loginData;

  if (!email || !password) {
    throw new Error("Email and Password are required.");
  }

  const [admins] = await pool.execute(
    FIND_ADMIN_BY_EMAIL,
    [email]
  );

  if (admins.length === 0) {
    throw new Error("Invalid Email or Password.");
  }

  const admin = admins[0];

  const isPasswordValid = await bcrypt.compare(
    password,
    admin.PasswordHash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid Email or Password.");
  }

  const token = jwt.sign(
    {
      adminId: admin.AdminId,
      email: admin.Email,
      role: admin.Role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    message: "Login Successful",
    token,
    admin: {
      adminId: admin.AdminId,
      fullName: admin.FullName,
      email: admin.Email,
      role: admin.Role,
    },
  };
}