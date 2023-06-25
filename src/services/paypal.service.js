import axios from "axios";
const API_URL = "/pay";
// const API_URL_upload = "/Files";

const registerPackage = (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
// const fetchFileDetail = (data) => {
//   return axios.get(API_URL + "/getFile/id?file_id=" + data);
// };
// const downLoadFile = (link) => {
//   return axios.get(API_URL + "/download/" + link, {
//     responseType: "blob",
//   });
// };
const PayPalService = {
  registerPackage,
};

export default PayPalService;
