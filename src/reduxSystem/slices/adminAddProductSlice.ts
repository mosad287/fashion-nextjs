import { IAdminProduct } from "@/interfaces/adminProduct";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "get all products",
  async (_, asyncThunk) => {
    const { rejectWithValue } = asyncThunk;

    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

interface IShopState {
  allProductLoading: boolean;
  allProducts: IAdminProduct[];
}

const data: IShopState = {
  allProductLoading: false,
  allProducts: [],
};

const allProducts = createSlice({
  name: "allProducts slice",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    // all products
    builder.addCase(getAllProducts.pending, (state) => {
      state.allProductLoading = true;
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.allProductLoading = false;
      state.allProducts = action.payload.data;
    });

    builder.addCase(getAllProducts.rejected, (state) => {
      state.allProductLoading = false;
    });
  },
});

export const adminAddProductSlice = allProducts.reducer;
