import axios from "axios";
const API_URL = "/file";
// const API_URL_upload = "/Files";

const fetchFileList = () => {
  return axios.get(API_URL + "/Files");
};
const uploadFile = (formData) => {
  return axios.post(API_URL + "/upload/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const fetchFileDetail = (data) => {
  return axios.get(API_URL + "/getFile/id?file_id=" + data);
};
const downLoadFile = (link) => {
  return axios.get(API_URL + "/download/file/" + link, {
    responseType: "blob",
  });
};
const fileService = {
  fetchFileList,
  uploadFile,
  fetchFileDetail,
  downLoadFile,
};

export default fileService;
