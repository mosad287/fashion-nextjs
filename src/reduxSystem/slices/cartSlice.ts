import { ICartItem } from "@/interfaces/cartItem";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// get cart items
export const getUserCart = createAsyncThunk(
  "get user cart",
  async (token: string, asyncThunk) => {
    const { rejectWithValue } = asyncThunk;

    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token,
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type Parameter = {
  token: string;
  id: string;
};

// add cart product
export const addCartProduct = createAsyncThunk(
  "add cart product",
  async ({ token, id }: Parameter, asyncThunk) => {
    const { rejectWithValue } = asyncThunk;

    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token,
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type UpdateParameter = {
  count: number;
  id: string;
};

// update cart product
export const updateCartProduct = createAsyncThunk(
  "update cart product",
  async ({ count, id }: UpdateParameter, asyncThunk) => {
    const { rejectWithValue } = asyncThunk;

    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// delete cart product
export const deleteCartProduct = createAsyncThunk(
  "delete cart product",
  async ({ token, id }: Parameter, asyncThunk) => {
    const { rejectWithValue } = asyncThunk;

    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token,
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// clear cart product
export const clearCartProduct = createAsyncThunk(
  "clear cart product",
  async (token: string, asyncThunk) => {
    const { rejectWithValue } = asyncThunk;

    try {
      const res = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token,
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

interface ICartData {
  userCartLoading: boolean;
  addProductCartLoading: boolean;
  updateProductCartLoading: boolean;
  deleteProductCartLoading: boolean;
  clearProductCartLoading: boolean;
  userCartError: string;
  userCart: ICartItem[];
  numCartItems: number;
  totalCartPrice: number;
  cartId: string;
}

const data: ICartData = {
  userCartLoading: false,
  addProductCartLoading: false,
  updateProductCartLoading: false,
  deleteProductCartLoading: false,
  clearProductCartLoading: false,
  userCartError: "",
  userCart: [],
  numCartItems: 0,
  totalCartPrice: 0,
  cartId: "",
};

const cart = createSlice({
  name: "use cart",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    // get all product cart --------------------------------------------
    builder.addCase(getUserCart.pending, (state) => {
      state.userCartLoading = true;
    });
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.userCartLoading = false;
      state.userCart = action.payload.data.products;
      state.numCartItems = action.payload.numOfCartItems;
      state.totalCartPrice = action.payload.data.totalCartPrice;
      state.cartId = action.payload.data._id;
    });
    builder.addCase(getUserCart.rejected, (state, action) => {
      state.userCartLoading = false;
      state.userCartError =
        (action.payload as AxiosError<{ message: string }>)?.response?.data
          ?.message || "Something went wrong";
    });

    // add product cart --------------------------------------------
    builder.addCase(addCartProduct.pending, (state) => {
      state.addProductCartLoading = true;
    });
    builder.addCase(addCartProduct.fulfilled, (state, action) => {
      state.addProductCartLoading = false;
      state.userCart = action.payload.data.products;
    });
    builder.addCase(addCartProduct.rejected, (state, action) => {
      state.addProductCartLoading = false;
      state.userCartError =
        (action.payload as AxiosError<{ message: string }>)?.response?.data
          ?.message || "Something went wrong";
    });

    // update product cart --------------------------------------------
    builder.addCase(updateCartProduct.pending, (state) => {
      state.updateProductCartLoading = true;
    });
    builder.addCase(updateCartProduct.fulfilled, (state, action) => {
      state.updateProductCartLoading = false;
      state.userCart = action.payload.data.products;
      state.totalCartPrice = action?.payload?.data.totalCartPrice;
    });
    builder.addCase(updateCartProduct.rejected, (state, action) => {
      state.updateProductCartLoading = false;
      state.userCartError =
        (action.payload as AxiosError<{ message: string }>)?.response?.data
          ?.message || "Something went wrong";
    });

    // delete product cart --------------------------------------------
    builder.addCase(deleteCartProduct.pending, (state) => {
      state.deleteProductCartLoading = true;
    });
    builder.addCase(deleteCartProduct.fulfilled, (state, action) => {
      state.deleteProductCartLoading = false;
      state.userCart = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
    });
    builder.addCase(deleteCartProduct.rejected, (state, action) => {
      state.deleteProductCartLoading = false;
      state.userCartError =
        (action.payload as AxiosError<{ message: string }>)?.response?.data
          ?.message || "Something went wrong";
    });

    // clear product cart --------------------------------------------
    builder.addCase(clearCartProduct.pending, (state) => {
      state.clearProductCartLoading = true;
    });
    builder.addCase(clearCartProduct.fulfilled, (state) => {
      state.clearProductCartLoading = false;
      state.userCart = [];
      state.totalCartPrice = 0;
    });
    builder.addCase(clearCartProduct.rejected, (state, action) => {
      state.clearProductCartLoading = false;
      state.userCartError =
        (action.payload as AxiosError<{ message: string }>)?.response?.data
          ?.message || "Something went wrong";
    });
  },
});

export const cartSlice = cart.reducer;
