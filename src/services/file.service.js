import axios from "axios";
const API_URL = "/file/";

const fetchFileList = () => {
  return axios.get(API_URL+"TopFiles");
};
const fileService = {
    fetchFileList,
};

export default fileService;