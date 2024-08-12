import axios from "axios";

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: "http://localhost:8000/api/v1",
});

export default axiosApi;
