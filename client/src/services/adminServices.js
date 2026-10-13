import api from "./api";

export const getAdminDashboard = async () => {
  const res = await api.get("/api/admin/dashboard");
  return res.data;
};