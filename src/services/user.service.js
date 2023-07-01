import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const fetchUser = (userId) => {
  return axios.get(API_URL + "/user?user_id=" + userId);
};

const userService = {
  fetchUser,
};

export default userService;
