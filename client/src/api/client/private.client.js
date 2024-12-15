import axios from "axios";
import queryString from "query-string";

// const baseURL = "http://127.0.0.1:5000/api/v1/";
// const baseURL = "https://flixxit-backend.vercel.app/api/v1/";
const baseURL = "flixxit-backend-six.vercel.app/api/v1/";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("actkn");
  return {
    ...config,
    headers: {
      ...config.headers, // Preserve existing headers
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // Only add Authorization if token exists
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
