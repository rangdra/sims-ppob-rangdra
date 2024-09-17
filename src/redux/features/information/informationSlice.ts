import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../../helpers/getErrorMessage";
import informationService from "./informationnService";
import { IBanner, IService } from "../../../types/information.type";

const initialState = {
  services: [] as IService[],
  banners: [] as IBanner[],

  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getServices = createAsyncThunk(
  "information/services",
  async (_: any, thunkAPI) => {
    try {
      return await informationService.getServices();
    } catch (error: any) {
      const message = getErrorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBanners = createAsyncThunk(
  "information/banners",
  async (_: any, thunkAPI) => {
    try {
      return await informationService.getBanners();
    } catch (error: any) {
      const message = getErrorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.services = action.payload.data;
      })
      .addCase(getServices.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.services = [];
      })
      .addCase(getBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.banners = action.payload.data;
      })
      .addCase(getBanners.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.banners = [];
      });
  },
});

export const { reset } = informationSlice.actions;
export default informationSlice.reducer;
