import axios from "axios";

const API = "http://127.0.0.1:8000";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API}/search/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const sendChat = async (query, products) => {
  const res = await axios.post(`${API}/chat/`, {
    query,
    products,
  });
  return res.data;
};

// optional voice (when you hook mic)
export const sendVoice = async (blob) => {
  const formData = new FormData();
  formData.append("file", blob, "audio.wav");
  const res = await axios.post(`${API}/voice/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};