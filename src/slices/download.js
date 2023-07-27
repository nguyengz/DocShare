import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import fileService from "~/services/file.service";
import { setMessage } from "./message";

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
      // const fileBuffer = Buffer.from(data);
      // const fileTypeResult = await fileType.fromBuffer(fileBuffer);
      // const mimeType = fileTypeResult?.mime ?? 'application/octet-stream';
      // const file = new Blob([data], { type: response.headers["content-type"] });
      const file = new Blob([data], { type: "application/pdf" });
      const newFileName = fileName.replace(".docx", ".pdf");
      saveAs(file, newFileName);
      // saveAs(file, fileName);
      return { fileName };
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.response.data.message;
      const errorMessage = errorResponse.message
        ? errorResponse.message
        : "Unknown error";
      const errorStatus = error.response.status ? error.response.status : null;
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString("");
      thunkAPI.dispatch(setMessage(message));
      if (errorStatus === 500) {
        await Swal.fire({
          icon: "error",
          title: "Download failed!",
          text: "Your account has been disabled!",
        });
      } else if (errorStatus === 403 || errorStatus === 401) {
        await Swal.fire({
          icon: "error",
          title: "Download failed!",
          text: "You do not have permission to access this file.",
        }).then(() => {
          thunkAPI.dispatch(setShowPricing(true));
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Download failed!",
          text: "An error occurred while downloading the file.",
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
