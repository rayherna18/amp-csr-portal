import axios from "axios";

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
      ? import.meta.env.VITE_API_BASE_URL // production
      : 'http://localhost:3000',  // local dev
    headers: {
      "Content-Type": "application/json",
    },
  });

export default api;