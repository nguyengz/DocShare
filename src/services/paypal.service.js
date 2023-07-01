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

const PayPalService = {
  registerPackage,
};

export default PayPalService;
