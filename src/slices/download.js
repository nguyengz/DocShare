import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import Pricing from "~/pages/Payment/Package";
import fileService from "~/services/file.service";

const initialState = {
  status: "",
  error: null,
  showErrorModal: false,
  showPricing: false,
};

export const downloadFile = createAsyncThunk(
  "download/downloadFile",
  async ({ link, fileName }, thunkAPI) => {
    try {
      const response = await fileService.downLoadFile(link);
      const data = await response.data.arrayBuffer();
      // const file = new Blob([data], { type: response.headers["content-type"] });
      const file = new Blob([data], { type: "application/pdf" });
      saveAs(file, fileName);
      return { fileName };
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : "Unknown error";
      const errorMessage = errorResponse.message
        ? errorResponse.message
        : "Unknown error";
      const errorStatus = errorResponse.status ? errorResponse.status : null;
      if (errorStatus === 403 && errorMessage === "Forbidden") {
        Swal.fire({
          icon: "error",
          title: "Download failed!",
          text: "You do not have permission to access this file.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Download failed!",
          text: "An error occurred while downloading the file.",
        }).then(() => {
          thunkAPI.dispatch(setShowPricing(true));
        });
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
  {
    serializeError: (error) => {
      return { message: error.message, stack: error.stack };
    },
  }
);

export const downloadSlice = createSlice({
  name: "download",
  initialState,
  reducers: {
    setShowErrorModal: (state, action) => {
      state.showErrorModal = true;
    },
    setShowPricing: (state, action) => {
      state.showPricing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.showErrorModal = true;
      });
  },
});

export const { setShowErrorModal, setShowPricing } = downloadSlice.actions;

export default downloadSlice.reducer;
