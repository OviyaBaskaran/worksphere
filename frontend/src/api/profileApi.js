import api from "./api";

// Get logged-in admin profile
export const getProfileApi = () => {
  return api.get("/profile");
};


// Update profile details
export const updateProfileApi = (formData) => {
  return api.put("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


// Change password
export const changePasswordApi = (passwordData) => {
  return api.put("/profile/password", passwordData);
};