import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import authService from "../services/auth.service";
import fileService from "~/services/file.service";

const user = JSON.parse(localStorage.getItem("user"));

export const fetchUserAbout = createAsyncThunk(
  "auth/fetchUserAbout",
  async (user_id, thunkAPI) => {
    try {
      const response = await authService.fetchUserAbout(user_id);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setMessage(error.response.data));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, username, email, password }, thunkAPI) => {
    try {
      const startTime = performance.now(); // Lấy thời gian bắt đầu request
      const response = await AuthService.register(
        name,
        username,
        email,
        password
      );
      const endTime = performance.now(); // Lấy thời gian kết thúc request
      const requestTime = endTime - startTime;
      thunkAPI.dispatch(setRequestTime(requestTime)); // Tính toán thời gian mất để hoàn thành request
      thunkAPI.dispatch(setMessage(response.data.message));
      await Swal.fire({
        icon: response.data.message === "Create success!" ? "success" : "error",
        title: response.data.message,
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
        error.toString("");
      thunkAPI.dispatch(setMessage(message));
      Swal.fire({
        icon: "error",
        title: message,
        timer: 2000,
        showConfirmButton: false,
      });
      return thunkAPI.rejectWithValue();
    }
  }
);
export const setRequestTime = (requestTime) => ({
  type: "SET_REQUEST_TIME",
  payload: requestTime,
});
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      // thunkAPI.dispatch(setMessage(data.data.message));
      return { user: data };
    } catch (error) {
      const message =
        (error.data && error.data && error.data.message) ||
        error.message ||
        error.toString("Sai tai khoan hoac mat khau");
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data, thunkAPI) => {
    try {
      const response = await authService.updateUser(data);
      Swal.fire({
        icon: "success",
        title: "Infomation updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const UpdateFile = createAsyncThunk(
  "auth/UpdateFile",
  async (data, thunkAPI) => {
    try {
      const response = await fileService.UpdateFile(data);
      Swal.fire({
        icon: "success",
        title: "Infomation updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString("No update file. Please check infomation of file");
      thunkAPI.dispatch(setMessage(message));
      Swal.fire({
        icon: "error",
        title: message,
        timer: 2000,
        showConfirmButton: false,
      });
      return thunkAPI.rejectWithValue();
    }
  }
);
// export const fetchUser = createAsyncThunk(
//   "auth/fetchUser",
//   async (data, thunkAPI) => {
//     const response = await AuthService.fetchUser(data);
//     thunkAPI.dispatch(setMessage(response.data.message));
//     return response.data;
//   }
// );
export const updateRoles = (updatedUser) => ({
  type: "UPDATE_ROLES",
  payload: updatedUser,
});
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});
export const selectRequestTime = (state) => state.auth.requestTime;
const initialState = user
  ? { isLoggedIn: true, user, userAbout: [] }
  : { isLoggedIn: false, user: null, userAbout: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRequestTime: (state, action) => {
      state.requestTime = action.payload;
    },
  },
  extraReducers: {
    [fetchUserAbout.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUserAbout.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userAbout = action.payload;
    },
    [fetchUserAbout.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload.user;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      // state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload.user;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [updateUser.pending]: (state) => {
      state.status = "loading";
    },
    // Handle the fulfilled state when updating package
    [updateUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userAbout = state.userAbout.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    // Handle the rejected state when updating package
    [updateUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [UpdateFile.pending]: (state) => {
      state.status = "loading";
    },
    // Handle the fulfilled state when updating package
    [UpdateFile.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const updatedFile = action.payload;
      state.userAbout = {
        ...state.userAbout,
        files: state.userAbout.files.map((file) =>
          file.id === updatedFile.id ? updatedFile : file
        ),
      };
    },
    // Handle the rejected state when updating package
    [UpdateFile.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [updateRoles.type]: (state, action) => {
      state.user.roles = action.payload.roles.slice();
    },
  },
});

const { reducer } = authSlice;
export default reducer;
