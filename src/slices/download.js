import { createSlice } from '@reduxjs/toolkit';
import { saveAs } from 'file-saver';
import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import fileService from "~/services/file.service";
export const downloadFile = createAsyncThunk(
    'download/downloadFile',
    async ({ fileUrl, fileName }, { rejectWithValue }) => {
      try {
        const response = await fileService.downLoadFile(fileUrl)
        saveAs(response.data, fileName);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
export const downloadSlice = createSlice({
  name: 'download',
  initialState: {
    isLoading: false,
    error: null,
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
  },
});