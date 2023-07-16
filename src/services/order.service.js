import axios from "axios";

const API_URL = "/order";

const fetchMyPackage = (user_id, friend_id) => {
  return axios.get(`${API_URL}/access/list?user_id=${user_id}`);
};
const oderService = {
  fetchMyPackage,
};

export default oderService;
