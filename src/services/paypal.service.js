import axios from "axios";
const SERICE_API = process.env.REACT_APP_SERVICE_API;
const API_URL = "/pay";
// const API_URL_upload = "/Files";

const registerPackage = (formData) => {
  return axios.post(SERICE_API + API_URL, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const PayPalService = {
  registerPackage,
};

export default PayPalService;
