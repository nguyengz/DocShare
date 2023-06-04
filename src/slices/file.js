import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import fileService from '~/services/file.service';
export const fetchfile = createAsyncThunk(
  'file/fetchFileList',
  async () => {
    const response = await fileService.fetchFileList();
    return response.data;
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
      });
  },
});

export default fileSlice.reducer;