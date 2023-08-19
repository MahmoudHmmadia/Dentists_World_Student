import axios from "axios";
const LOCAL_URL = "http://localhost:3500/";
const URL = "https://dentist-world-api.onrender.com";
export default axios.create({
  baseURL: URL,
});
export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "Application/json",
  },
  withCredentials: true,
});
