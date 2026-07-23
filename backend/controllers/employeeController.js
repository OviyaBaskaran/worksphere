import { getAllEmployeesService,
  getEmployeeByIdService,
  createEmployeeService,
  updateEmployeeService,deleteEmployeeService } from "../services/employeeService.js";

export async function getAllEmployees(req, res) {

  try {

    const employees = await getAllEmployeesService();

    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully.",
      data: employees,
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

    const employee = await getEmployeeByIdService(id);


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

    const employeeId = await createEmployeeService(req.body);


    return res.status(201).json({
      success: true,
      message: "Employee created successfully.",
      data: {
        EmployeeId: employeeId
      }
    });


  } catch(error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}

export async function updateEmployee(req, res) {

  try {

    const { id } = req.params;

    const result = await updateEmployeeService(
      id,
      req.body
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
        EmployeeId: id
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

    const result = await deleteEmployeeService(id);


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