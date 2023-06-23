import { Alert } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/api/auth/";

const register = (name, username, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      } else if (response.data.error) {
        alert("Sai tên tài khoản hoặc mật khẩu");
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};
const fetchUser = (data) => {
  return axios.get(API_URL + "/users?user_id=" + data);
};

const authService = {
  register,
  login,
  logout,
  fetchUser,
};

export default authService;