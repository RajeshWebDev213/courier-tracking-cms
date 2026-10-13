import api from "./api";

// Customer - get active services
export const getActiveServices = async () => {
  const res = await api.get("/api/services");
  return res.data;
};

// Admin - get all services
export const getAllServices = async () => {
  const res = await api.get("/api/services");
  return res.data;
};

// Admin - create service
export const createService = async (data) => {
  const res = await api.post("/api/services", data);
  return res.data;
};

// Admin - update service
export const updateService = async (id, data) => {
  const res = await api.put(`/api/services/${id}`, data);
  return res.data;
};

// Admin - delete service
export const deleteService = async (id) => {
  const res = await api.delete(`/api/services/${id}`);
  return res.data;
};