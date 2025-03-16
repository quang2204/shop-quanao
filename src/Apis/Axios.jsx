import axios from "axios";
import nProgress from "nprogress";

nProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 600,
  trickleRate: 0.5,
  easing: "ease",
  speed: 200,
  trickle: true,
  trickleRate: 0.02,
  trickleSpeed: 100,
});
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

instance.interceptors.request.use(
  function (config) {
    nProgress.start();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    nProgress.done();
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
