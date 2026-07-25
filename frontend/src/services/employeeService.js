import {
  getEmployeesApi,
  getEmployeeByIdApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from "../api/employeeApi";


// Get employees
export const fetchEmployees = (filters) => {

  return getEmployeesApi(filters);

};


// Get single employee
export const fetchEmployeeById = (id) => {

  return getEmployeeByIdApi(id);

};


// Add employee
export const addEmployee = (employeeData) => {

  return createEmployeeApi(employeeData);

};


// Update employee
export const editEmployee = (
  id,
  employeeData
) => {

  return updateEmployeeApi(
    id,
    employeeData
  );

};


// Delete employee
export const removeEmployee = (id) => {

  return deleteEmployeeApi(id);

};