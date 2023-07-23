import axios from "axios";
const SERICE_API = process.env.REACT_APP_SERVICE_API;
const API_URL = "/order";

const fetchMyPackage = (user_id) => {
  return axios.get(`${SERICE_API}${API_URL}/access/list?user_id=${user_id}`);
};
const oderService = {
  fetchMyPackage,
};

export default oderService;
