// src/http/httpClient.js
import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default httpClient; // ✅ export as default

