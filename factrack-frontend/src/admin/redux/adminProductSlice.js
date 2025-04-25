import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FETCH all products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get("http://localhost:5000/api/admin/fetch-products");
  return res.data.data;
});

// ADD new product
export const addProduct = createAsyncThunk("products/add", async (product) => {
  const res = await axios.post("http://localhost:5000/api/admin/add-product", product);
  return res.data;
});

// DELETE product
export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await axios.put(`http://localhost:5000/api/admin/delete-product/${id}`);
  return id;
});

// UPDATE product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/admin/update-product/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Update failed" });
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p._id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
