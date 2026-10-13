import api from "./api";

// Get all shipments - Admin
export const getAllShipments = async () => {
  const res = await api.get("/api/shipments");
  return res.data;
};

// Get shipment by MongoDB ID - Admin
export const getShipmentById = async (id) => {
  const res = await api.get(`/api/shipments/${id}`);
  return res.data;
};

export const getMyShipments = async () => {
  const res = await api.get("/api/shipments/my");
  return res.data;
};
// Get shipment by tracking number - Customer
export const getShipmentByTrackingNumber = async (trackingNumber) => {
  const res = await api.get(
    `/api/shipments/tracking/${trackingNumber}`
  );

  return res.data;
};

// Create shipment
export const createShipment = async (data) => {
  const res = await api.post("/api/shipments", data);
  return res.data;
};

// Update shipment - Admin
export const updateShipment = async (id, data) => {
  const res = await api.put(
    `/api/shipments/${id}`,
    data
  );

  return res.data;
};

// Delete shipment - Admin
export const deleteShipment = async (id) => {
  const res = await api.delete(
    `/api/shipments/${id}`
  );

  return res.data;
};