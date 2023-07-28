import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import fileService from "~/services/file.service";
import { setMessage } from "./message";

export const fetchfile = createAsyncThunk("file/fetchFileList", async () => {
  const response = await fileService.fetchFileList();
  return response.data;
});

export const fetchfileTop = createAsyncThunk("file/fetchFileTop", async () => {
  const response = await fileService.fetchFileTop();
  return response.data;
});

export const fetchfileFeatured = createAsyncThunk(
  "file/fetchFileFeatured",
  async () => {
    const response = await fileService.fetchFileFeatured();
    return response.data;
  }
);

export const fetchFileDetail = createAsyncThunk(
  "file/fetchFileDetail",
  async ([file_id, user_id], thunkAPI) => {
    const response = await fileService.fetchFileDetail(file_id, user_id);
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  }
);

// export const downLoadFile = createAsyncThunk(
//   "file/downLoadFile",
//   async (link, thunkAPI) => {
//     const response = await fileService.downLoadFile(link);
//     thunkAPI.dispatch(setMessage(response.data.message));
//     return response.data;
//   }
// );

export const uploadfile = createAsyncThunk(
  "file/uploadFile",
  async (formdata, thunkAPI) => {
    try {
      const response = await fileService.uploadFile(formdata);
      thunkAPI.dispatch(setMessage(response.data.message));
      // thunkAPI.dispatch(
      //   fileSlice.actions.setSuccessMessage("File uploaded successfully")
      // );
      Swal.fire({
        icon: "success",
        title: "File uploaded successfully",
      });
      const user = JSON.parse(localStorage.getItem("user"));
      // const user = { ...currentUser }; // Lấy thông tin user từ Redux store
      user.roles = [{ authority: "USER" }];
      localStorage.setItem("user", JSON.stringify(user));
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
        title: "Upload error!",
        text: error.response.data,
      });
      return thunkAPI.rejectWithValue();
    }
  }
);
export const deletedFile = createAsyncThunk(
  "file/deletedFile",
  async (dataDelete, thunkAPI) => {
    try {
      const response = await fileService.deletedFile(dataDelete);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred while deleting the file";
      thunkAPI.dispatch(setMessage(errorMessage));
      throw error;
    }
  }
);
export const unLike = createAsyncThunk(
  "file/unLike",
  async (data, thunkAPI) => {
    try {
      const response = await fileService.unLike(data);
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
export const LikeFile = createAsyncThunk(
  "file/LikeFile",
  async (data, thunkAPI) => {
    try {
      const response = await fileService.LikeFile(data);
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

export const setRequestTime = createAction("user/setRequestTime");
const fileSlice = createSlice({
  name: "file",
  initialState: {
    data: [],
    fileList: [],
    topView: [],
    feaTured: [],
    detailList: [],
    status: "no",
    error: null,
    successMessage: null,
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
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fileList = action.payload;
      })
      .addCase(fetchfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchfileTop.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchfileTop.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topView = action.payload;
      })
      .addCase(fetchfileTop.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchfileFeatured.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchfileFeatured.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feaTured = action.payload;
      })
      .addCase(fetchfileFeatured.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFileDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFileDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailList = action.payload;
      })
      .addCase(fetchFileDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(downLoadFile.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(downLoadFile.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.data = action.payload;
      // })
      // .addCase(downLoadFile.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })

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
      })
      .addCase(deletedFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletedFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deletedFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(unLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unLike.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailList.like = false;
        state.detailList.likeFile -= 1;
      })
      .addCase(unLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(LikeFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LikeFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailList.like = true;
        state.detailList.likeFile += 1;
      })
      .addCase(LikeFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default fileSlice.reducer;
