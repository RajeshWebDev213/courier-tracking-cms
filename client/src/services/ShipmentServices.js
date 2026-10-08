import api from "./api";

// Create shipment
export const createShipment = async (data) => {
  const res = await api.post("/shipments", data);
  return res.data;
};

// Update shipment
export const updateShipment = async (id, data) => {
  const res = await api.put(`/shipments/${id}`, data);
  return res.data;
};

// Get shipment by ID
export const getShipmentById = async (id) => {
  const res = await api.get(`/shipments/${id}`);
  return res.data;
};

// Get all shipments
export const getAllShipments = async () => {
  const res = await api.get("/shipments");
  return res.data;
};

// Delete shipment
export const deleteShipment = async (id) => {
  const res = await api.delete(`/shipments/${id}`);
  return res.data;
};