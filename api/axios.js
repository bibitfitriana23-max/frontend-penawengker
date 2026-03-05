import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // localhost backend
});

export default api;