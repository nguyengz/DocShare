import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import categoryService from '~/services/category.service';
export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async () => {
    const response = await categoryService.fetchCategory();
    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: { data: [], status: 'no', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;