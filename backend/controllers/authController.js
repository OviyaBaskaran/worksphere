import jwt from "jsonwebtoken";
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

    const result =
      await loginAdminService(req.body);


    // Store Refresh Token in HTTP Only Cookie

    res.cookie(

      "refreshToken",

      result.refreshToken,

      {

        httpOnly: true,

        secure: process.env.NODE_ENV === "production",

        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",

        maxAge:
          7 * 24 * 60 * 60 * 1000,

      }

    );


    return res.status(200).json({

      success: true,

      message: "Admin login successful.",

      data: {

        accessToken:
          result.accessToken,


        admin:
          result.admin,

      },

    });


  } catch (error) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

}

export async function refreshAccessToken(req, res) {

  try {

    const refreshToken = req.cookies.refreshToken;


    if (!refreshToken) {

      return res.status(401).json({

        success:false,

        message:"Refresh token missing."

      });

    }



    const decoded = jwt.verify(

      refreshToken,

      process.env.JWT_REFRESH_SECRET

    );



    const accessToken = jwt.sign(

      {
        adminId: decoded.adminId,
      },

      process.env.JWT_SECRET,

      {
        expiresIn:"30m"
      }

    );



    return res.status(200).json({

      success:true,

      accessToken

    });


  }
  catch(error) {

    return res.status(401).json({

      success:false,

      message:"Refresh token expired or invalid."

    });

  }

}
