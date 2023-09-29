import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.coinstats.app/public/v1/",
});
