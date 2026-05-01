import axios from "axios";
const API = "http://127.0.0.1:8000";
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API}/search/`, formData);
  return res.data;
};
export const compareProducts = async (products) => {
  const res = await axios.post(`${API}/ai/compare`, { products });
  return res.data;
};
export const summarizeReviews = async (reviews) => {
  const res = await axios.post(`${API}/ai/summarize-reviews`, { reviews });
  return res.data;
};
export const getStyleRecommendations = async (preferences, products) => {
  const res = await axios.post(`${API}/ai/style-recommendations`, { preferences, products });
  return res.data;
};
export const sendChat = async (query, page = 1, gender = "all") => {
  const res = await axios.post(`${API}/chat/`, {
    message: query,
    page: page,
    gender: gender
  });
  return res.data;
};