import { PayloadAction } from "@reduxjs/toolkit";

import {
  AddCommentPayload,
  DeleteCommentPayload,
  EditProduct,
  Product,
  ProductsState,
} from "../interface/products";

export const handlePending = (state: ProductsState) => {
  state.isLoading = true;
};

export const handleFetchFulfilled = (
  state: ProductsState,
  action: PayloadAction<Product[]>
) => {
  state.isLoading = false;
  state.error = "";
  state.products = state.products.concat(action.payload).sort((a, b) => {
    // У випадку більшої кількості варіантів краще використати switch
    if (state.sortingOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (state.sortingOption === "count") {
      return a.count - b.count;
    }
    return 0;
  });
};

export const handleRejected = (
  state: ProductsState,
  action: PayloadAction<string | undefined>
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
  action: PayloadAction<string>
) => {
  state.isLoading = false;
  state.error = "";

  const index = state.products.findIndex(
    (product) => product.id === action.payload
  );
  state.products.splice(index, 1);
};

export const handleDeleteCommentFulfilled = (
  state: ProductsState,
  action: PayloadAction<DeleteCommentPayload>
) => {
  state.isLoading = false;
  state.error = "";

  const { productId, commentId } = action.payload;

  const productIndex = state.products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    state.products[productIndex].comments = state.products[
      productIndex
    ].comments.filter((comment) => comment.id !== commentId);
  }
};

export const handleAddCommentFulfilled = (
  state: ProductsState,
  action: PayloadAction<AddCommentPayload>
) => {
  state.isLoading = false;
  state.error = "";

  const { productId, comment } = action.payload;

  const productIndex = state.products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    state.products[productIndex].comments.push(comment);
  }
};

export const handleEditProductFulfilled = (
  state: ProductsState,
  action: PayloadAction<EditProduct>
) => {
  state.isLoading = false;
  state.error = "";

  const { id, formData } = action.payload;

  const productIndex = state.products.findIndex((product) => product.id === id);

  if (productIndex !== -1) {
    const existingProduct = state.products[productIndex];
    state.products[productIndex] = { ...existingProduct, ...formData };
  }
};
