import axios from "axios";

export const api = axios.create({
  baseURL: "https://openapiv1.coinstats.app",
  headers: {
    "X-API-KEY": import.meta.env.VITE_API_KEY,
  },
});
