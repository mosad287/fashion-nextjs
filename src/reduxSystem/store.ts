import { configureStore } from "@reduxjs/toolkit";
import { mainStatesSlice } from "./slices/mainStatesSlice";
import { authSlice } from "./slices/authSlice";
import { shopSlice } from "./slices/shopSlice";
import { cartSlice } from "./slices/cartSlice";
import { profileSlice } from "./slices/profile";
import { adminAddProductSlice } from "./slices/adminAddProductSlice";

const mainStore = configureStore({
  reducer: {
    mainStatesSlice,
    authSlice,
    shopSlice,
    cartSlice,
    profileSlice,
    adminAddProductSlice,
  },
});

export default mainStore;

export type StoreType = ReturnType<typeof mainStore.getState>;
export type DispatchType = (typeof mainStore)["dispatch"];
