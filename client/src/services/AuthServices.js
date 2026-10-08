import api from "./api";

export const register = async (data) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const getAccount = async () => {
  const res = await api.get("/api/auth/me");
  return res.data;
};