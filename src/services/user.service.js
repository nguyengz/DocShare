import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const fetchUser = (userId) => {
  return axios.get(API_URL + "/user?user_id=" + userId);
};
const deletedFile = (dataDelete) => {
  return axios.delete("http://localhost:8080/file/delete/user", {
    data: dataDelete,
  });
};
const userService = {
  fetchUser,
  deletedFile,
};

export default userService;
