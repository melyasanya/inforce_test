import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  AddCommentPayload,
  DeleteCommentPayload,
  EditProduct,
  Product,
} from "../interface/products";
import { RootState } from "./store";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetch", async (_, thunkAPI) => {
  try {
    const response = await axios.get<Product[]>(
      "http://localhost:3000/product"
    );
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("products/add", async (newProduct, thunkAPI) => {
  try {
    const response = await axios.post<Product>(
      "http://localhost:3000/product",
      newProduct
    );
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("products/delete", async (productId, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3000/product/${productId}`);
    return productId;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteComment = createAsyncThunk<
  DeleteCommentPayload,
  DeleteCommentPayload,
  { rejectValue: string; state: RootState }
>("products/deleteComment", async ({ productId, commentId }, thunkAPI) => {
  try {
    const state: RootState = thunkAPI.getState();
    const productIndex = state.products.products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
      const updatedComments = state.products.products[
        productIndex
      ].comments.filter((comment) => comment.id !== commentId);

      await axios.patch(`http://localhost:3000/product/${productId}`, {
        comments: updatedComments,
      });
    }
    return { productId, commentId };
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addComment = createAsyncThunk<
  AddCommentPayload,
  AddCommentPayload,
  { rejectValue: string; state: RootState }
>("products/addComment", async ({ productId, comment }, thunkAPI) => {
  try {
    const state: RootState = thunkAPI.getState();
    const productIndex = state.products.products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
      const updatedComments = [
        ...state.products.products[productIndex].comments,
        comment,
      ];

      await axios.patch(`http://localhost:3000/product/${productId}`, {
        comments: updatedComments,
      });
    }
    return { productId, comment };
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const editProduct = createAsyncThunk<
  EditProduct,
  EditProduct,
  { rejectValue: string; state: RootState }
>("products/editProduct", async ({ id, formData }, thunkAPI) => {
  try {
    const { imageUrl, name, count, size, weight } = formData;

    await axios.patch(`http://localhost:3000/product/${id}`, {
      imageUrl,
      name,
      count,
      size,
      weight,
    });
    return { id, formData };
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
