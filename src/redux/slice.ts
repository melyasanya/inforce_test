import { createSlice } from "@reduxjs/toolkit";

import { addProduct, deleteProduct, fetchProducts } from "./operations";
import { ProductsState } from "../interface/products";
import {
  handleAddFulfilled,
  handleDeleteFulfilled,
  handleFetchFulfilled,
  handlePending,
  handleRejected,
} from "./handlers";

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, handleFetchFulfilled)
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(addProduct.pending, handlePending)
      .addCase(addProduct.fulfilled, handleAddFulfilled)
      .addCase(addProduct.rejected, handleRejected)
      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.fulfilled, handleDeleteFulfilled)
      .addCase(deleteProduct.rejected, handleRejected);
  },
});

export const productsReducer = productsSlice.reducer;
