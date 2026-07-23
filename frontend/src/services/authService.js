import { loginAdmin } from "../api/authApi";

export const login = async (formData) => {
  const response = await loginAdmin(formData);

  // Store JWT Token
  localStorage.setItem("token", response.token);

  // Store Logged-in Admin
  localStorage.setItem(
    "admin",
    JSON.stringify(response.admin)
  );

  return response;
};