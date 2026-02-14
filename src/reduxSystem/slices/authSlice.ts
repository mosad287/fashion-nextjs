import { IUserLogin, IUserRegester } from "@/interfaces/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// function to user regester
export const userRegester = createAsyncThunk(
  "user regester",
  async (value: IUserRegester, asyncthunk) => {
    const { rejectWithValue } = asyncthunk;

    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        value,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// function to user login
export const userLogin = createAsyncThunk(
  "user login",
  async (value: IUserLogin, asyncthunk) => {
    const { rejectWithValue } = asyncthunk;

    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        value,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

interface AuthState {
  userLoading: boolean;
  userRegesterError: string;
  userLoginError: string;
  userToken: string;
}

const data: AuthState = {
  userLoading: false,
  userRegesterError: "",
  userLoginError: "",
  userToken: "",
};

function isFulfilld(
  state: AuthState,
  action: PayloadAction<{ token: string }>,
) {
  state.userLoading = false;
  state.userToken = action.payload.token;
  localStorage.setItem("token", action.payload.token);
}

const auth = createSlice({
  name: "auth slice",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    // user regester

    builder.addCase(userRegester.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(userRegester.fulfilled, (state, action) => {
      isFulfilld(state, action);
    });
    builder.addCase(userRegester.rejected, (state, action) => {
      state.userLoading = false;
      state.userRegesterError = action?.payload?.response.data.message;
    });

    // user login

    builder.addCase(userLogin.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      isFulfilld(state, action);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.userLoading = false;
      state.userLoginError = action?.payload?.response.data.message;
    });
  },
});

export const authSlice = auth.reducer;
