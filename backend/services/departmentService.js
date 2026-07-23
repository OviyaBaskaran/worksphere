import pool from "../config/db.js";

import {
  getAllDepartmentsQuery,
  getDepartmentByIdQuery,
  createDepartmentQuery,
  updateDepartmentQuery,
  deleteDepartmentQuery,
} from "../sql/departmentQueries.js";

export async function getAllDepartmentsService() {

  const [departments] = await pool.execute(
    getAllDepartmentsQuery
  );

  return departments;

}

export async function getDepartmentByIdService(departmentId) {

  const [rows] = await pool.execute(
    getDepartmentByIdQuery,
    [departmentId]
  );

  return rows[0];

}

export async function createDepartmentService(departmentData) {

  const {
    departmentName,
  } = departmentData;


  const [result] = await pool.execute(
    createDepartmentQuery,
    [departmentName]
  );

  return result.insertId;

}

export async function updateDepartmentService(departmentId, departmentData) {

  const {
    departmentName,
  } = departmentData;


  const [result] = await pool.execute(
    updateDepartmentQuery,
    [
      departmentName,
      departmentId,
    ]
  );

  return result.affectedRows;

}

export async function deleteDepartmentService(departmentId) {

  const [result] = await pool.execute(
    deleteDepartmentQuery,
    [departmentId]
  );

  return result.affectedRows;

}