import httpClient from "../utils/HttpClient";
import { httpMethod, APiRoutes } from "../configs/endpoint";  // ✔ FIXED IMPORT

export const getAllInquiries = async () => {
  return await httpClient.get(APiRoutes.inquiry.getAll);
};