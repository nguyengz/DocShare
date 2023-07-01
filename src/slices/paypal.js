import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import PayPalService from "~/services/paypal.service";
import { setMessage } from "./message";
import { useNavigate } from "react-router-dom";

export const registerPackage = createAsyncThunk(
  "pay/registerPackage",
  async (formdata, thunkAPI) => {
  
    try {
      const response = await PayPalService.registerPackage(formdata);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString("");
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const packageSlice = createSlice({
  name: "pay",
  initialState: {
    data: [],
    status: "no",
    error: null,
    successMessage: null,
  },
  reducers: {
    downloadFileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    downloadFileSuccess: (state) => {
      state.isLoading = false;
    },
    downloadFileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPackage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerPackage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(registerPackage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.data = action.payload;
      });
  },
});

export default packageSlice.reducer;
