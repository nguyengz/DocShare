import { configureStore } from "@reduxjs/toolkit";
import authReducer from "~/slices/auth";
import messageReducer from "~/slices/message";
import categoryReducer from "~/slices/category";
const reducer = {
  auth: authReducer,
  message: messageReducer,
  category: categoryReducer,
};

const store = configureStore({
  reducer: reducer,

  devTools: true,
  middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(),
});

export default store;
