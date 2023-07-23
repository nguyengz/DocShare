import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import oderService from "~/services/order.service";

export const fetchMyPackage = createAsyncThunk(
  "order/fetchMyPackage",
  async (user_id) => {
    const response = await oderService.fetchMyPackage(user_id);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    status: "no",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPackage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyPackage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMyPackage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
