import axios from "axios";
const SERICE_API = process.env.REACT_APP_SERVICE_API;
const API_URL = "/api/auth";

const fetchUser = (user_id, friend_id) => {
  return axios.get(
    `${SERICE_API}${API_URL}/user?user_id=${
      user_id ? user_id : 0
    }&friend_id=${friend_id}`
  );
};
const deletedFile = (dataDelete) => {
  return axios.delete("http://localhost:8080/file/delete/user", {
    data: dataDelete,
  });
};
const unFollowUser = (data) => {
  return axios.delete(SERICE_API + API_URL + "/unfollow", { data: data });
};
const followUser = (data) => {
  return axios.post(SERICE_API + API_URL + "/follow", data);
};
const userService = {
  fetchUser,
  deletedFile,
  unFollowUser,
  followUser,
};

export default userService;
