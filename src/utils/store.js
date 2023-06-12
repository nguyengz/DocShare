import { configureStore } from "@reduxjs/toolkit";
import authReducer from "~/slices/auth";
import messageReducer from "~/slices/message";
import categoryReducer from "~/slices/category";
import fileReducer from "~/slices/file";
import userReducer from "~/slices/user";
const reducer = {
  auth: authReducer,
  message: messageReducer,
  category: categoryReducer,
  file: fileReducer,
  userAbout: userReducer,
};

const store = configureStore({
  reducer: reducer,

  devTools: true,
  middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(),
});

export default store;
