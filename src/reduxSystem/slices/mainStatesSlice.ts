import { createSlice } from "@reduxjs/toolkit";

const data = {
  isLogin: false,
  isAdmin: false,
};

const states = createSlice({
  name: "main states",
  initialState: data,
  reducers: {
    // function to check login
    setLoginTrue: (state) => {
      state.isLogin = true;
    },
    setLoginFalse: (state) => {
      state.isLogin = false;
    },

    // function to check admin
    setAdminTrue: (state) => {
      state.isAdmin = true;
    },
    setAdminFalse: (state) => {
      state.isAdmin = false;
    },
  },
});

export const mainStatesSlice = states.reducer;
export const { setLoginFalse, setLoginTrue, setAdminFalse, setAdminTrue } =
  states.actions;
