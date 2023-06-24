import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  async (data, thunkAPI) => {
    const response = await fileService.fetchFileDetail(data);
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  }
);

export const downLoadFile = createAsyncThunk(
  "file/downLoadFile",
  async (link, thunkAPI) => {
    const response = await fileService.downLoadFile(link);
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  }
);

export const uploadfile = createAsyncThunk(
  "file/uploadFile",
  async (formdata, thunkAPI) => {
    try {
      const response = await fileService.uploadFile(formdata);
      thunkAPI.dispatch(setMessage(response.data.message));
      // Dispatch the success message using dispatch() function
      thunkAPI.dispatch(
        fileSlice.actions.setSuccessMessage("File uploaded successfully")
      );
      // Display the success message using Swal.fire()
      Swal.fire({
        icon: "success",
        title: "File uploaded successfully",
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
      return thunkAPI.rejectWithValue();
    }
  }
);



const fileSlice = createSlice({
  name: "file",
  initialState: {
    data: [],
    fileList: [],
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
        state.data = action.payload;
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
        state.data = action.payload;
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
      .addCase(downLoadFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downLoadFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(downLoadFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

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
      });
  },
});

export default fileSlice.reducer;
