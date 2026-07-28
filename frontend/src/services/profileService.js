import {
  getProfileApi,
  updateProfileApi,
  changePasswordApi,
} from "../api/profileApi";


// Fetch profile
export const fetchProfile = async () => {

  try {

    const response =
      await getProfileApi();


    return response.data.data;


  }
  catch(error){

    throw error.response?.data || {
      message:"Failed to fetch profile"
    };

  }

};

// Update profile
export const updateProfile = async (profileData) => {

  try {

    const response =
      await updateProfileApi(profileData);


    return response.data;


  } catch (error) {

    throw error.response?.data || {
      message: "Failed to update profile",
    };

  }

};




// Change password
export const updatePassword = async (passwordData) => {

  try {

    const response =
      await changePasswordApi(passwordData);


    return response.data;


  } catch (error) {

    throw error.response?.data || {
      message: "Failed to change password",
    };

  }

};