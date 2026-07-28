import { loginAdmin } from "../api/authApi";

export const login = async (formData) => {

  const response = await loginAdmin(formData);

  const {
    accessToken,
    admin,
  } = response.data;

  localStorage.setItem(
    "token",
    accessToken
  );

  localStorage.setItem(
    "user",
    JSON.stringify(admin)
  );

  return response;

};