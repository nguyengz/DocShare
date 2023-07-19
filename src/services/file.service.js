import axios from "axios";
import authHeader from "./auth-header";
const SERICE_API = process.env.REACT_APP_SERVICE_API;
const API_URL = "/file";
// const API_URL_upload = "/Files";
// const user = JSON.parse(localStorage.getItem("user"));

const fetchFileList = () => {
  return axios.get(SERICE_API + API_URL + "/ListFiles");
};
const fetchFileTop = () => {
  return axios.get(SERICE_API + API_URL + "/TopFiles");
};
const fetchFileFeatured = () => {
  return axios.get(SERICE_API + API_URL + "/Featured");
};
const uploadFile = (formData) => {
  return axios.post(SERICE_API + API_URL + "/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const deletedFile = (dataDelete) => {
  return axios.delete(SERICE_API + API_URL + "/delete/user", {
    data: dataDelete,
  });
};
const fetchFileDetail = (file_id, user_id) => {
  return axios.get(
    `${SERICE_API}${API_URL}/getFile/id?file_id=${file_id}&user_id=${
      user_id ? user_id : 0
    }`
  );
};
const downLoadFile = (link) => {
  return axios.get(SERICE_API + API_URL + "/download/" + link, {
    responseType: "blob",
    headers: authHeader(),
  });
};
const UpdateFile = (data, fileName) => {
  return axios.put(SERICE_API + API_URL + "/update", data);
};
const unLike = (data) => {
  return axios.delete(SERICE_API + API_URL + "/delete/like", { data: data });
};
const LikeFile = (data) => {
  return axios.post(SERICE_API + API_URL + "/like", data);
};

const fileService = {
  fetchFileList,
  fetchFileTop,
  fetchFileFeatured,
  uploadFile,
  fetchFileDetail,
  downLoadFile,
  deletedFile,
  unLike,
  LikeFile,
  UpdateFile,
};

export default fileService;
