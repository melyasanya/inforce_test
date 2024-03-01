import { PayloadAction } from "@reduxjs/toolkit";

import { Product, ProductsState } from "../interface/products";

export const handlePending = (state: ProductsState) => {
  state.isLoading = true;
};

export const handleFetchFulfilled = (
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

export const handleAddFulfilled = (
  state: ProductsState,
  action: PayloadAction<Product>
) => {
  state.isLoading = false;
  state.error = "";
  state.products.push(action.payload);
};

export const handleDeleteFulfilled = (
  state: ProductsState,
  action: PayloadAction<any>
) => {
  state.isLoading = false;
  state.error = "";
  state.products = state.products.filter(
    (product) => product.id !== action.payload
  );
};
