"use client";
import axios from "axios";

class noTokenApiFactory {
  createClient(method, baseURL) {
    // 取得環境變數中的API前綴
    const apiPrefix = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.API_PORT}/${process.env.API_ROOT}/${process.env.API_VERSION}/`;

    const client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    client.interceptors.request.use(
      (config) => {
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
      (error) => {
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
  return new noTokenApiFactory().createClient(method, baseURL);
};
