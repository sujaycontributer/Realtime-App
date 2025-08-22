import { BACKEND_URL } from "@/lib/utils";
import axios from "axios";


// Create one configured axios instance
const api = axios.create({
  baseURL: BACKEND_URL  || "http://localhost:3000",
  withCredentials: true, // ✅ always send cookies
});



export default api;
