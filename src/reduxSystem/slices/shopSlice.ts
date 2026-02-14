import { IProductDetails } from "@/interfaces/productDetails";
import { IShopProduct } from "@/interfaces/shopProduct";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// all product
export const getShopProducts = createAsyncThunk(
  "get shop products",
  async (_, asyncThunk) => {
    const { rejectWithValue } = asyncThunk;

    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWY1M2EzNTJlOGUwY2EzZDFiNzU4NSIsIm5hbWUiOiJtb3NhZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzYzODM3MDkwLCJleHAiOjE3NzE2MTMwOTB9.x-oUL7_3O6hjrd_f7PEk_carT3GA988rkzuAQPhbLv8",
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// product details
export const getProductDetails = createAsyncThunk(
  "get products details",
  async (id: string, asyncThunk) => {
    const { rejectWithValue } = asyncThunk;

    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

interface IShopState {
  shopProductsLoading: boolean;
  shopProductsError: string;
  shopProducts: IShopProduct[];
  ProductDetailsLoading: boolean;
  productDetailsError: string;
  productDetails: IProductDetails;
}

const data: IShopState = {
  shopProductsLoading: false,
  shopProductsError: "",
  shopProducts: [],
  ProductDetailsLoading: false,
  productDetailsError: "",
  productDetails: {} as IProductDetails,
};

const shop = createSlice({
  name: "shop slice",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    // all products
    builder.addCase(getShopProducts.pending, (state) => {
      state.shopProductsLoading = true;
    });

    builder.addCase(getShopProducts.fulfilled, (state, action) => {
      state.shopProductsLoading = false;
      state.shopProducts = action.payload.data.products;
    });

    builder.addCase(getShopProducts.rejected, (state, action) => {
      state.shopProductsLoading = false;
      state.shopProductsError =
        (action.payload as any)?.response?.data?.message ||
        "Something went wrong";
    });

    // product details
    builder.addCase(getProductDetails.pending, (state) => {
      state.ProductDetailsLoading = true;
    });

    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.ProductDetailsLoading = false;
      state.productDetails = action.payload.data;
    });

    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.ProductDetailsLoading = false;
      state.productDetailsError =
        (action.payload as any)?.response?.data?.message ||
        "Something went wrong";
    });
  },
});

export const shopSlice = shop.reducer;
