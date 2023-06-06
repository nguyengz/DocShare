import axios from "axios";
const API_URL = "file/category/list";

const fetchCategory = () => {
  return axios.get(API_URL);
};
const categoryService = {
  fetchCategory,
};

export default categoryService;
