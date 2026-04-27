import axios from "axios";
const API = "http://127.0.0.1:8000";
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API}/search/`, formData);
  return res.data;
};
export const sendChat = async (query, products) => {
  const res = await axios.post(`${API}/chat/`, {
    message: query,   
    products
  });
  return res.data;
};