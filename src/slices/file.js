import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';
import fileService from "~/services/file.service";
import { setMessage } from "./message";
export const fetchfile = createAsyncThunk("file/fetchFileList", async () => {
  const response = await fileService.fetchFileList();
  return response.data;
});
export const fetchFileDetail = createAsyncThunk(
  "file/fetchFileDetail",
  async (data, thunkAPI) => {
    const response = await fileService.fetchFileDetail(data);
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
    
  }
);
export const downLoadFile = createAsyncThunk(
  "file/downLoadFile",
  async (link, thunkAPI) => {
    const response = await fileService.downLoadFile(link);
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  }
);
export const uploadfile = createAsyncThunk(
  "file/uploadFile",
  async (formdata, thunkAPI) => {
    try {
      const response = await fileService.uploadFile(formdata);
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
const fileSlice = createSlice({
  name: "file",
  initialState: { data: [], status: "no", error: null },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFileDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFileDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFileDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(downLoadFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downLoadFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(downLoadFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      .addCase(uploadfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(uploadfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default fileSlice.reducer;
