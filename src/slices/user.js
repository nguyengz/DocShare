import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import userService from "~/services/user.service";
import Swal from "sweetalert2";
import fileService from "~/services/file.service";

export const fetchUser = createAsyncThunk(
  "userAbout/fetchUser",
  async ([user_id, friend_id], thunkAPI) => {
    try {
      const response = await userService.fetchUser(user_id, friend_id);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deletedFile = createAsyncThunk(
  "userAbout/deletedFile",
  async (dataDelete, thunkAPI) => {
    try {
      const startTime = performance.now();
      const response = await fileService.deletedFile(dataDelete);
      const endTime = performance.now(); // Lấy thời gian kết thúc request
      const requestTime = endTime - startTime;
      // thunkAPI.dispatch(setRequestTime(requestTime));
      thunkAPI.dispatch(setMessage(response.data));
      Swal.fire({
        icon: "success",
        title: response.data,
        timer: requestTime > 1000 ? requestTime : 1000,
        showConfirmButton: false,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString("Error when delete file");
      // const jsonObject = JSON.parse(message.substring(message.indexOf("{")));
      // const errorMessage = jsonObject.message;
      // const jsonString = JSON.stringify(message);
      // const errorObject = JSON.parse(jsonString);
      // const errorMessage = errorObject.message;
      thunkAPI.dispatch(setMessage(message));
      Swal.fire({
        icon: "error",
        title: message,
        timer: 3000,
        showConfirmButton: false,
      });
      throw error;
    }
  }
);
export const unFollowUser = createAsyncThunk(
  "userAbout/unFollowUser",
  async (data, thunkAPI) => {
    try {
      const response = await userService.unFollowUser(data);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Error";
      thunkAPI.dispatch(setMessage(errorMessage));
      throw error;
    }
  }
);
export const followUser = createAsyncThunk(
  "userAbout/followUser",
  async (data, thunkAPI) => {
    try {
      const response = await userService.followUser(data);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Error";
      thunkAPI.dispatch(setMessage(errorMessage));
      throw error;
    }
  }
);
const userSlice = createSlice({
  name: "userAbout",
  initialState: {
    userAbout: null,
    data: false,
    status: "sidle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAbout = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(unFollowUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAbout.hasFollow = false;
      })
      .addCase(unFollowUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(followUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAbout.hasFollow = true;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletedFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletedFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = true;
      })
      .addCase(deletedFile.rejected, (state, action) => {
        state.status = "failed";
        state.data = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = userSlice;
export default reducer;
