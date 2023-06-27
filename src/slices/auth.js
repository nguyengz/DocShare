import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        name,
        username,
        email,
        password
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
// export const fetchUser = createAsyncThunk(
//   "auth/fetchUser",
//   async (data, thunkAPI) => {
//     const response = await AuthService.fetchUser(data);
//     thunkAPI.dispatch(setMessage(response.data.message));
//     return response.data;
//   }
// );
export const updateRoles = (updatedUser) => ({
  type: 'UPDATE_ROLES',
  payload: updatedUser,
});
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.error = action.payload.error;
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
    [updateRoles.type]: (state, action) => {
      state.user.roles = action.payload.roles.slice();
    },
  },
});

const { reducer } = authSlice;
export default reducer;
