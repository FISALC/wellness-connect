// src/lib/api.ts
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ""; 
// e.g. http://localhost:5099

if (!API_BASE) {
  // just to help during dev
  console.warn("VITE_API_BASE_URL is not set!");
}

export const api = axios.create({
  baseURL: API_BASE,
  // You can set default headers if needed
  // headers: { "Content-Type": "application/json" },
});
