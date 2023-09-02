import axios from "axios";
import Cookies from "cookies-js";

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const jwt = Cookies.get("jwt");

  if (jwt) {
    config.headers['Authorization'] = `Bearer ${jwt}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});


let showTokenExpirationModalCallback;
export const registerTokenExpirationCallback = (callback) => {
  showTokenExpirationModalCallback = callback;
};


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (showTokenExpirationModalCallback) {
        showTokenExpirationModalCallback();
      }
    }
    return Promise.reject(error);
  }
);



export default api;
