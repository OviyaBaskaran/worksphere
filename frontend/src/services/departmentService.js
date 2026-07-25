import { getDepartments } from "../api/departmentApi";

export async function fetchDepartments() {
  return await getDepartments();
}