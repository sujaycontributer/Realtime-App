import { BACKEND_URL } from "@/lib/utils";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // ✅ always send cookies
});



export default api;
