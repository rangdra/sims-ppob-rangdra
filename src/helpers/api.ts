import axios from "axios";
import { getToken, removeToken } from "./auth";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
axios.defaults.timeout = 300000;

export const httpRequest = axios.create();

httpRequest.interceptors.request.use(
  async (config) => {
    if (config.headers === undefined) {
      console.log("headers are undefined");
      return config;
    }
    config.headers["Content-Type"] =
      config.headers["Content-Type"] || "application/json";
    const token = getToken();
    if (token != null) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    console.error("httpRequest: Error interceptor request:::", error.response);
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response) {
      console.log("err::", error.response);
      if (error.response.status === 401 || error.response.data.status === 109) {
        removeToken();
        window.location.href = "/login";
      }
      console.error(
        "httpRequest: Error interceptor response:::",
        error.response
      );
      return Promise.reject(error.response);
    } else if (error && error.message !== "canceled") {
      console.error(error);
    } else if (!error) {
      console.error(
        "httpRequest: Error interceptor response::: error is undefined"
      );
    }
  }
);
