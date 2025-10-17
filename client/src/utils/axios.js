import axios from "axios";

const API = axios.create({
  baseURL: "https://movie-rating-website-1.onrender.com/api", // backend base URL
  withCredentials: true, // ✅ send cookies (JWT)
});

export default API;
