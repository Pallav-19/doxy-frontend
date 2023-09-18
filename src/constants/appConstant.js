import { config } from "dotenv"
config();
export const baseURL = process.env.NODE_ENV === "production" ? "https://doxy-backend.onrender.com":"http://localhost:9000"