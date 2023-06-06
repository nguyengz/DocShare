import axios from "axios";
const API_URL = "/file";
// const API_URL_upload = "/Files";

const fetchFileList = () => {
  return axios.get(API_URL);
};
const uploadFile = (formData) => {
  return axios.post(API_URL+"/upload/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const fileService = {
  fetchFileList,
  uploadFile,
};

export default fileService;
