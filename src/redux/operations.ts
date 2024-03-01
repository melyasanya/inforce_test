import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Product } from "../interface/products";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetch", async (_, thunkAPI) => {
  try {
    const response = await axios.get<Product[]>(
      "https://fake-server-iota.vercel.app/product"
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
      "https://fake-server-iota.vercel.app/product",
      newProduct
    );
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteProduct = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("products/delete", async (productId, thunkAPI) => {
  try {
    await axios.delete(
      `https://fake-server-iota.vercel.app/product/${productId}`
    );
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
