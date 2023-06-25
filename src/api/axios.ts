import axios from "axios";
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
