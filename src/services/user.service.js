import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const fetchUser = (user_id, friend_id) => {
  return axios.get(
    `${API_URL}/user?user_id=${user_id ? user_id : 0}&friend_id=${friend_id}`
  );
};
const deletedFile = (dataDelete) => {
  return axios.delete("http://localhost:8080/file/delete/user", {
    data: dataDelete,
  });
};
const unFollowUser = (data) => {
  const config = {
    data: data,
  };
  return axios.delete(API_URL + "/unfollow", config);
};
const followUser = (data) => {
  return axios.post(API_URL + "/follow", data);
};
const userService = {
  fetchUser,
  deletedFile,
  unFollowUser,
  followUser,
};

export default userService;
