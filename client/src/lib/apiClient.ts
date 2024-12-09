import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api`, // Replace with your deployed API URL
});

export default apiClient;
