import httpClient from "../utils/HttpClient";
import { httpMethod, APiRoutes } from "../configs/endpoint";  // ✔ FIXED IMPORT

export const createStaff = async (formData) => {
  return await httpClient.post(APiRoutes.Staff.create, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getAllStaff = async () => {
  return await httpClient.get(APiRoutes.Staff.getAll);
};

export const updateStaffStatus = (id, status) => {
  return httpClient({
    method: httpMethod.Patch,
    url: APiRoutes.Staff.updateStatus(id),
    data: { status },
  });
};
