import httpClient from "../utils/HttpClient";

export const createService = async (formData) => {
  return await httpClient.post("/api/services/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  
};
export const getAllServices = async () => {
  return await httpClient.get("/api/services");
};
export const deleteService = async (serviceId) => {
 return await httpClient.delete(`/api/services/${serviceId}`);
}
export const getServiceById = async (id) => {
  return await httpClient.get(`/api/services/${id}`);
};

export const updateService = async (id, formData) => {
  return await httpClient.put(`/api/services/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}