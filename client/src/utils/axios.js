import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
  withCredentials: true, // ✅ send cookies (JWT)
});

export default API;
