import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "/file";
// const API_URL_upload = "/Files";

const fetchFileList = () => {
  return axios.get(API_URL + "/ListFiles");
};
const fetchFileTop = () => {
  return axios.get(API_URL + "/TopFiles");
};
const fetchFileFeatured = () => {
  return axios.get(API_URL + "/Featured");
};
const uploadFile = (formData) => {
  return axios.post(API_URL + "/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const fetchFileDetail = (data) => {
  return axios.get(API_URL + "/getFile/id?file_id=" + data);
};
const user = JSON.parse(localStorage.getItem("user"));
const downLoadFile = (link,fileName) => {
  return axios.get(API_URL + "/download/" + link, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};
const fileService = {
  fetchFileList,
  fetchFileTop,
  fetchFileFeatured,
  uploadFile,
  fetchFileDetail,
  downLoadFile,
};

export default fileService;
