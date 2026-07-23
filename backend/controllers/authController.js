import {
  registerAdminService,
  loginAdminService,
} from "../services/authService.js";


export async function registerAdmin(req, res) {

  try {

    const result = await registerAdminService(req.body);

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully.",
      data: result,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

}


export async function loginAdmin(req, res) {

  try {

    const result = await loginAdminService(req.body);

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",
      data: result,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

}