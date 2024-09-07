"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create an instance of Axios
var axiosInstance = _axios["default"].create({
  baseURL: 'http://localhost:5001/api' // Replace with your backend URL

}); // Attach an interceptor to add the token to every request


axiosInstance.interceptors.request.use(function (config) {
  // Get the token from localStorage
  var token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = "Bearer ".concat(token); // Attach the token to the Authorization header
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});
var _default = axiosInstance;
exports["default"] = _default;