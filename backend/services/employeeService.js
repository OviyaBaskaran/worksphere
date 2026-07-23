import pool from "../config/db.js";

import {getAllEmployeesQuery,getAllEmployeebyIdQuery,createEmployeeQuery,updateEmployeeQuery,deleteEmployeeQuery
} from "../sql/employeeQueries.js";

export async function getAllEmployeesService() {

  const [employees] = await pool.execute(
    getAllEmployeesQuery
  );

  return employees;

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