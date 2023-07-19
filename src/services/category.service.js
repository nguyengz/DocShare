import axios from "axios";
const SERICE_API = process.env.REACT_APP_SERVICE_API;
const API_URL = "file/category/list";

const fetchCategory = () => {
  return axios.get(SERICE_API + API_URL);
};
const categoryService = {
  fetchCategory,
};

export default categoryService;
