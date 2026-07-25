import pool from "../config/db.js";

import {
  getAllEmployeebyIdQuery,
  createEmployeeQuery,
  updateEmployeeQuery,
  deleteEmployeeQuery,
} from "../sql/employeeQueries.js";

export async function getAllEmployeesService(filters = {}) {

  const {
    search = "",
    department = "",
    status = "",
    page = 1,
    limit = 10,
  } = filters;

  const currentPage = Number(page) || 1;
  const pageSize = Number(limit) || 10;
  const offset = (currentPage - 1) * pageSize;

  let query = `
    SELECT
      e.EmployeeId,
      e.EmployeeCode,
      e.FullName,
      e.Email,
      e.Phone,
      d.DepartmentName,
      e.Designation,
      e.Salary,
      e.JoiningDate,
      e.Status,
      e.Photo
    FROM Employees e
    INNER JOIN Departments d
      ON e.DepartmentId = d.DepartmentId
    WHERE 1 = 1
  `;

  let countQuery = `
    SELECT
      COUNT(*) AS TotalRecords
    FROM Employees e
    WHERE 1 = 1
  `;

  const values = [];
  const countValues = [];

  if (search) {
    query += ` AND e.FullName LIKE ?`;
    countQuery += ` AND e.FullName LIKE ?`;

    values.push(`%${search}%`);
    countValues.push(`%${search}%`);
  }

  if (department) {
    query += ` AND e.DepartmentId = ?`;
    countQuery += ` AND e.DepartmentId = ?`;

    values.push(Number(department));
    countValues.push(Number(department));
  }

  if (status) {
    query += ` AND e.Status = ?`;
    countQuery += ` AND e.Status = ?`;

    values.push(status);
    countValues.push(status);
  }

  query += `
    ORDER BY e.EmployeeId DESC
    LIMIT ?
    OFFSET ?
  `;

  values.push(pageSize);
  values.push(offset);

  // Use query() because the SQL is built dynamically
  const [employees] = await pool.query(query, values);

  const [countResult] = await pool.query(
    countQuery,
    countValues
  );

  const totalRecords = countResult[0].TotalRecords;

  return {
    employees,
    pagination: {
      currentPage,
      totalPages: Math.ceil(totalRecords / pageSize),
      totalRecords,
      limit: pageSize,
    },
  };
}

export async function getEmployeeByIdService(employeeId) {

  const [rows] = await pool.query(
    getAllEmployeebyIdQuery,
    [employeeId]
  );

  return rows[0];

}

export async function createEmployeeService(employeeData) {

  const {
    employeeCode,
    fullName,
    email,
    phone,
    departmentId,
    designation,
    salary,
    joiningDate,
    status,
    photo,
  } = employeeData;

  const [result] = await pool.execute(
    createEmployeeQuery,
    [
      employeeCode,
      fullName,
      email,
      phone,
      departmentId,
      designation,
      salary,
      joiningDate,
      status,
      photo,
    ]
  );

  return result.insertId;

}

export async function updateEmployeeService(employeeId, employeeData) {

  const {
    fullName,
    email,
    phone,
    departmentId,
    designation,
    salary,
    joiningDate,
    status,
    photo,
  } = employeeData;

  const [result] = await pool.execute(
    updateEmployeeQuery,
    [
      fullName,
      email,
      phone,
      departmentId,
      designation,
      salary,
      joiningDate,
      status,
      photo,
      employeeId,
    ]
  );

  return result.affectedRows;

}

export async function deleteEmployeeService(employeeId) {

  const [result] = await pool.execute(
    deleteEmployeeQuery,
    [employeeId]
  );

  return result.affectedRows;

}