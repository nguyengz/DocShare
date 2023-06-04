import axios from "axios";
const API_URL = "/Files";

const fetchFileList = () => {
  return axios.get(API_URL);
};
const fileService = {
    fetchFileList,
};

export default fileService;