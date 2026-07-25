import { loginAdmin } from "../api/authApi";

export const login = async (formData) => {

  const response = await loginAdmin(formData);

  const {
    token,
    admin
  } = response.data;

  localStorage.setItem("token", token);

  localStorage.setItem(
    "admin",
    JSON.stringify(admin)
  );

  return response;

};