import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Size {
  width: number;
  height: number;
}

interface Comment {
  id: number;
  productId: number;
  description: string;
  date: string;
}

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
  comments: Comment[];
}

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
