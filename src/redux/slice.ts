import { createSlice } from "@reduxjs/toolkit";

import {
  addComment,
  addProduct,
  deleteComment,
  deleteProduct,
  editProduct,
  fetchProducts,
} from "./operations";
import { ProductsState } from "../interface/products";
import {
  handleAddCommentFulfilled,
  handleAddFulfilled,
  handleDeleteCommentFulfilled,
  handleDeleteFulfilled,
  handleEditProductFulfilled,
  handleFetchFulfilled,
  handlePending,
  handleRejected,
} from "./handlers";

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: "",
  sortingOption: "name",
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
      .addCase(deleteProduct.rejected, handleRejected)
      .addCase(deleteComment.pending, handlePending)
      .addCase(deleteComment.fulfilled, handleDeleteCommentFulfilled)
      .addCase(deleteComment.rejected, handleRejected)
      .addCase(addComment.pending, handlePending)
      .addCase(addComment.fulfilled, handleAddCommentFulfilled)
      .addCase(addComment.rejected, handleRejected)
      .addCase(editProduct.pending, handlePending)
      .addCase(editProduct.fulfilled, handleEditProductFulfilled)
      .addCase(editProduct.rejected, handleRejected);
  },
});

export const productsReducer = productsSlice.reducer;
