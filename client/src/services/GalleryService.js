import api from "./api";

export const getGallery = async () => {
  const res = await api.get("/api/gallery");
  return res.data;
};

export const createGallery = async (data) => {
  const res = await api.post("/api/gallery", data);
  return res.data;
};

export const updateGallery = async (id, data) => {
  const res = await api.put(`/api/gallery/${id}`, data);
  return res.data;
};

export const deleteGallery = async (id) => {
  const res = await api.delete(`/api/gallery/${id}`);
  return res.data;
};