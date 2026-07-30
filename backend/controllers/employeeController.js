import {
  getAllEmployeesService,
  getEmployeeByIdService,
  createEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
} from "../services/employeeService.js";

const phoneNumberPattern = /^\d{10,15}$/;

function hasValidPhoneNumber(phone) {
  return (
    phone === undefined ||
    phone === null ||
    phone === "" ||
    (typeof phone === "string" && phoneNumberPattern.test(phone))
  );
}

export async function getAllEmployees(req, res) {

  try {

    const {
      search,
      department,
      status,
      page,
      limit,
    } = req.query;

    const result = await getAllEmployeesService({
      search,
      department,
      status,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully.",
      data: result.employees,
      pagination: result.pagination,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}

export async function getEmployeeById(req, res) {

  try {

    const { id } = req.params;

    const employee =
      await getEmployeeByIdService(id);

    if (!employee) {

      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });

    }

    return res.status(200).json({
      success: true,
      message: "Employee fetched successfully.",
      data: employee,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}

export async function createEmployee(req, res) {

  try {

    if (!hasValidPhoneNumber(req.body.phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain 10 to 15 digits only.",
      });
    }

    const employeeData = {

      ...req.body,

      photo: req.file
  ? req.file.path
  : null,

    };

    const employeeId =
      await createEmployeeService(employeeData);

    return res.status(201).json({

      success: true,

      message: "Employee created successfully.",

      data: {
        EmployeeId: employeeId,
      },

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

}

export async function updateEmployee(req, res) {

  try {

    const { id } = req.params;

    if (!hasValidPhoneNumber(req.body.phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain 10 to 15 digits only.",
      });
    }

    const existingEmployee =
      await getEmployeeByIdService(id);

    if (!existingEmployee) {

      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });

    }

    const employeeData = {

      fullName:
        req.body.fullName ??
        existingEmployee.FullName,

      email:
        req.body.email ??
        existingEmployee.Email,

      phone:
        req.body.phone ??
        existingEmployee.Phone,

      departmentId:
        req.body.departmentId ??
        existingEmployee.DepartmentId,

      designation:
        req.body.designation ??
        existingEmployee.Designation,

      salary:
        req.body.salary ??
        existingEmployee.Salary,

      joiningDate:
        req.body.joiningDate ??
        existingEmployee.JoiningDate,

      status:
        req.body.status ??
        existingEmployee.Status,

      photo: req.file
  ? req.file.path
  : existingEmployee.Photo,

    };

    const result =
      await updateEmployeeService(
        id,
        employeeData
      );

    if (result === 0) {

      return res.status(404).json({

        success: false,

        message: "Employee not found.",

      });

    }

    return res.status(200).json({

      success: true,

      message: "Employee updated successfully.",

      data: {
        EmployeeId: id,
      },

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

}

export async function deleteEmployee(req, res) {

  try {

    const { id } = req.params;

    const result =
      await deleteEmployeeService(id);

    if (result === 0) {

      return res.status(404).json({

        success: false,

        message: "Employee not found.",

      });

    }

    return res.status(200).json({

      success: true,

      message: "Employee deleted successfully.",

      data: {
        EmployeeId: id,
      },

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

}
