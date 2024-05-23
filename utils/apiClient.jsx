"use client";
import axios from "axios";

class ApiFactory {
  createClient(method, baseURL) {
    // 取得環境變數中的API前綴
    const apiPrefix = `${process.env.PROTOCAL}://${process.env.HOST}:${process.env.API_PORT}/${process.env.API_ROOT}/${process.env.API_VERSION}/`;

    const client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 如果 URL 不包含協議 (http:// 或 https://)，則加上前綴
        if (!/^https?:\/\//i.test(config.url)) {
          config.url = `${apiPrefix}${config.url}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const refreshTokenURL = `${apiPrefix}member/SignInManager/refresh_token`;
            const refreshResponse = await axios.post(refreshTokenURL, {
              refresh: refreshToken,
            });
            localStorage.setItem("accessToken", refreshResponse.data.access);
            client.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${refreshResponse.data.accessToken}`;
            return client(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return {
      get: (url, config = {}) => client.get(url, config),
      post: (url, data = {}, config = {}) => client.post(url, data, config),
    }[method];
  }
}

export const createApiClient = (method, baseURL) => {
  return new ApiFactory().createClient(method, baseURL);
};
