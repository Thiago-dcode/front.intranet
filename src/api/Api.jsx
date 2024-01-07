import axios from "axios";
import ls from "localstorage-slim";
const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": `multipart/form-data`,
    Accept: "application/json",
  },
  withCredentials: true,
});

Api.interceptors.request.use((config) => {
  const token = ls.get("ACCESS_TOKEN", { decrypt: true });

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (import.meta.env.DEV) {
      console.error('Api.jsx error:',error)
    }
    if (response && response.status === 401) {
      ls.clear();
    }
    throw error;
  }
);
export default Api;
