import {
  getAllDepartmentsService,
  getDepartmentByIdService,
  createDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
} from "../services/departmentService.js";

export async function getAllDepartments(req, res) {

  try {

    const departments = await getAllDepartmentsService();

    return res.status(200).json({
      success: true,
      message: "Departments fetched successfully.",
      data: departments,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}

export async function getDepartmentById(req, res) {

  try {

    const { id } = req.params;

    const department = await getDepartmentByIdService(id);

    if (!department) {

      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });

    }

    return res.status(200).json({
      success: true,
      message: "Department fetched successfully.",
      data: department,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}

export async function createDepartment(req, res) {

  try {

    const departmentId = await createDepartmentService(req.body);

    return res.status(201).json({
      success: true,
      message: "Department created successfully.",
      data: {
        DepartmentId: departmentId,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}

export async function updateDepartment(req, res) {

  try {

    const { id } = req.params;

    const result = await updateDepartmentService(id, req.body);

    if (result === 0) {

      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });

    }

    return res.status(200).json({
      success: true,
      message: "Department updated successfully.",
      data: {
        DepartmentId: id,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}

export async function deleteDepartment(req, res) {

  try {

    const { id } = req.params;

    const result = await deleteDepartmentService(id);

    if (result === 0) {

      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });

    }

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully.",
      data: {
        DepartmentId: id,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}