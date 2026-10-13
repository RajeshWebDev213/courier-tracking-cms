import api from "./api";

// Get tracking details by tracking number
export const getTrackingDetails = async (trackingNumber) => {
  const res = await api.get(`/api/tracking/${trackingNumber}`);
  return res.data;
};

// Add tracking update
export const addTracking = async (shipmentId, data) => {
  const res = await api.post(
    `/api/shipments/${shipmentId}/tracking`,
    data
  );
  return res.data;
};

// Update shipment tracking/status
export const updateTracking = async (shipmentId, data) => {
  const res = await api.patch(
    `/api/shipments/${shipmentId}/tracking`,
    data
  );
  return res.data;
};