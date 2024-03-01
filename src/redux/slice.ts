import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./operations";
import { Product, ProductsState } from "../interface/products";

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: "",
};

export const handlePending = (state: ProductsState) => {
  state.isLoading = true;
};

export const handleFulfilled = (
  state: ProductsState,
  action: PayloadAction<Product[]>
) => {
  state.isLoading = false;
  state.error = "";
  state.products = state.products.concat(action.payload);
};

export const handleRejected = (
  state: ProductsState,
  action: PayloadAction<string | undefined, string, any, any>
) => {
  state.isLoading = false;
  state.error = action.payload || "An error occurred";
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, handleFulfilled)
      .addCase(fetchProducts.rejected, handleRejected);
  },
});

export const productsReducer = productsSlice.reducer;
