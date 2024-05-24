import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshTokens, shouldRefreshToken } from "./th-refresh-token";
import { generateToken, authenticateToken } from "./th-token-utils";

const axiosInstance = axios.create({
  baseURL: "https://turquoise.health/api",
});

// Interceptors for request and response
axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      const tokens = await generateToken(); // Generate tokens
      localStorage.setItem("access_token", tokens.accessToken);
      localStorage.setItem("refresh_token", tokens.refreshToken);
    }

    if (shouldRefreshToken(config)) {
      await refreshTokens();
    }

    const newAccessToken = localStorage.getItem("access_token");
    if (newAccessToken && config?.headers) {
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post("/tokens/refresh", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Error refreshing token:", err);
        // Handle token refresh error
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;