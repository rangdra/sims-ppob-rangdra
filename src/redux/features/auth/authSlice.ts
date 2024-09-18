import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import {
  ILoginRequest,
  IRegistrationRequest,
  IUpdateUserRequest,
  IUser,
} from "../../../types/user.type";
import { getErrorMessage } from "../../../helpers/getErrorMessage";
import { RcFile } from "antd/es/upload";
import { UploadFile } from "antd/lib";

let user: IUser | undefined;
if (typeof window !== "undefined") {
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
}

interface InitState {
  user: IUser | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
const initialState: InitState = {
  user: user ? user : undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: IRegistrationRequest, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message = getErrorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: ILoginRequest, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message = getErrorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_: any, thunkAPI) => {
    try {
      return await authService.getProfile();
    } catch (error: any) {
      const message = getErrorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBalance = createAsyncThunk(
  "auth/getBalance",
  async (_: any, thunkAPI) => {
    try {
      return await authService.getBalance();
    } catch (error: any) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (user: IUpdateUserRequest, thunkAPI) => {
    try {
      return await authService.updateProfile(user);
    } catch (error: any) {
      const message = getErrorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const uploadProfile = createAsyncThunk(
  "auth/uploadProfile",
  async (file: File | Blob | RcFile | UploadFile<any>, thunkAPI) => {
    try {
      return await authService.uploadProfile(file);
    } catch (error: any) {
      const message = getErrorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = undefined;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = undefined;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = undefined;
      })
      .addCase(uploadProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
      })
      .addCase(uploadProfile.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = undefined;
      })
      .addCase(getBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = {
          ...state.user!,
          balance: action.payload.data.balance as number,
        };
      })
      .addCase(getBalance.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.user = undefined;
      });
  },
});

export const { reset, setUser } = authSlice.actions;
export default authSlice.reducer;
