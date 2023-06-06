import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import fileService from '~/services/file.service';
import { setMessage } from "./message";
export const fetchfile = createAsyncThunk(
  'file/fetchFileList',
  async () => {
    const response = await fileService.fetchFileList();
    return response.data;
  }
);
export const uploadfile = createAsyncThunk(
  "file/uploadFile",
  async (formdata, thunkAPI) => {
    try {
      const response = await fileService.uploadFile(
       formdata
      );
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
  name: 'file',
  initialState: { data: [], status: 'no', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(uploadfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
     
  },
});

export default fileSlice.reducer;