import axios from "axios";

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
      ? 'amp-csr-backend-62ypdes0f-rayherna18s-projects.vercel.app' // production
      : 'http://localhost:3000',  // local dev
    headers: {
      "Content-Type": "application/json",
    },
  });

export default api;