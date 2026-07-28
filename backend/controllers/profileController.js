import {
  getUserProfileService,
  updateUserProfileService,
  changePasswordService,
} from "../services/profileService.js";

export async function getUserProfile(req, res) {

  try {

    const profile =
      await getUserProfileService(
        req.admin.adminId
      );

    return res.status(200).json({

      success: true,

      message: "Profile fetched successfully.",

      data: profile,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

}
export async function updateUserProfile(req, res) {

  try {

    const {
      FullName,
      Email,
    } = req.body;


    const photo =
      req.file
      ? req.file.path
      : null;



    await updateUserProfileService(

      req.admin.adminId,

      FullName,

      Email,

      photo

    );


    return res.status(200).json({

      success:true,

      message:
      "Profile updated successfully.",

    });


  }
  catch(error){


    return res.status(500).json({

      success:false,

      message:error.message,

    });


  }

}
export async function changePassword(req, res) {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    await changePasswordService(
      req.admin.adminId,
      currentPassword,
      newPassword
    );

    return res.status(200).json({

      success: true,

      message: "Password updated successfully.",

    });

  } catch (error) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

}

