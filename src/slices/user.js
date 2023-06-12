import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import userService from "~/services/user.service";

export const fetchUser = createAsyncThunk(
  "userAbout/fetchUser",
  async (userId, thunkAPI) => {
    try {
      const response = await userService.fetchUser(userId);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "userAbout",
  initialState: {
    userAbout: null,
    status: "sidle",
    error: null,
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userAbout = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
