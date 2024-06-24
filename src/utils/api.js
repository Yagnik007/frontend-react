import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Include protocol
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
