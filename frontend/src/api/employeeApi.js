import api from "./api";

// Get all employees
export const getEmployeesApi = (params) => {

  return api.get("/employees", {
    params,
  });

};

// Get employee by id
export const getEmployeeByIdApi = (id) => {

  return api.get(`/employees/${id}`);

};

// Create employee
export const createEmployeeApi = (employeeData) => {

  return api.post(
    "/employees",
    employeeData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

};

// Update employee
export const updateEmployeeApi = (
  id,
  employeeData
) => {

  return api.put(
    `/employees/${id}`,
    employeeData
  );

};

// Delete employee
export const deleteEmployeeApi = (id) => {

  return api.delete(
    `/employees/${id}`
  );

};