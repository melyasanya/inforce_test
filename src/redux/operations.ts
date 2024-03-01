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
  void,
  string,
  { rejectValue: string }
>("products/delete", async (productId, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3000/product/${productId}`);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
