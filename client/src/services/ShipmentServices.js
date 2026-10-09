import api from "./api";

export const createShipment = async (data) => {
  const res = await api.post("/api/shipments", data);
  return res.data;
};

export const getMyShipments = async () => {
  const res = await api.get("/api/shipments/my");
  return res.data;
};

export const getAllShipments = async () => {
  const res = await api.get("/api/shipments");
  return res.data;
};

export const getShipmentById = async (id) => {
  const res = await api.get(`/api/shipments/${id}`);
  return res.data;
};

export const updateShipment = async (id, data) => {
  const res = await api.put(`/api/shipments/${id}`, data);
  return res.data;
};

export const deleteShipment = async (id) => {
  const res = await api.delete(`/api/shipments/${id}`);
  return res.data;
};