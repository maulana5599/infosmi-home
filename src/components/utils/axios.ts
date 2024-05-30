import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      config.headers[
        "Authorization"
      ] = `Bearer 4|gx7pJfszbOdZGz2uLifHRpxi8aP2ydYo7nuOi0v3f0c8c300`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
