import axios from "axios";
import Swal from "sweetalert2";

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
        Swal.fire({
          icon: "success",
          title: "Welcome",
          timer: 2000,
          showConfirmButton: false,
        });
      } else if (response.data.error) {
        Swal.fire({
          icon: "error",
          title: "Password or Username failed",
          text: "Please check infomation again!",
          timer: 3000,
          showConfirmButton: false,
        });
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const fetchUserAbout = (user_id) => {
  return axios.get(API_URL + "user/about?user_id=" + user_id);
};
const updateUser = (data) => {
  return axios.put(`${API_URL}update/profile`, data);
};

const authService = {
  register,
  login,
  logout,
  fetchUserAbout,
  updateUser,
};

export default authService;
