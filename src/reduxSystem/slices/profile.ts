import { IProfileInfo } from "@/interfaces/profileinfo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// profile information
export const getProfileInfo = createAsyncThunk(
  "get profile info",
  async (_, asyncThunk) => {
    const { rejectWithValue } = asyncThunk;

    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/users/getMe",
        {
          headers: { token: localStorage.getItem("token") },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

interface IProfileState {
  profileLoading: boolean;
  profile: IProfileInfo;
}

const data: IProfileState = {
  profileLoading: false,
  profile: {} as IProfileInfo,
};

const profile = createSlice({
  name: "profile slice",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileInfo.pending, (state) => {
      state.profileLoading = true;
    });
    builder.addCase(getProfileInfo.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.profile = action.payload.data;
    });
    builder.addCase(getProfileInfo.rejected, (state, action) => {
      state.profileLoading = false;
      state.productDetailsError = action?.payload?.response.data.message;
    });
  },
});

export const profileSlice = profile.reducer;
