import api from "./api";

// Get admin settings
export const getAdminSettings = async () => {
  const res = await api.get("/api/admin/settings");
  return res.data;
};

// Update admin profile
export const updateAdminProfile = async (data) => {
  const res = await api.put(
    "/api/admin/settings/profile",
    data
  );

  return res.data;
};

// Change admin password
export const changeAdminPassword = async (data) => {
  const res = await api.put(
    "/api/admin/settings/password",
    data
  );

  return res.data;
};