import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FETCH all managers
export const fetchManagers = createAsyncThunk("managers/fetch", async () => {
  const res = await axios.get("http://localhost:5000/api/admin/fetch-managers");  
  return res.data.data;
});

// ADD new manager
export const addManager = createAsyncThunk("managers/add", async (manager) => {
  const res = await axios.post(
    "http://localhost:5000/api/admin/managers",
    manager
  );
  return res.data;
});

// DELETE manager
export const deleteManager = createAsyncThunk("managers/delete", async (id) => {
  await axios.put(`http://localhost:5000/api/admin/delete-manager/${id}`);
  return id;
});

// UPDATE manager
export const updateManager = createAsyncThunk(
  "admin/updateManager",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/admin/update-manager/${id}`,
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
      return rejectWithValue(
        error.response?.data || { message: "Update failed" }
      );
    }
  }
);

const adminSlice = createSlice({
  name: "managers",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagers.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
        } else {
          console.warn("Expected an array of managers, got:", action.payload);
          state.list = [];
        }
      })
      .addCase(addManager.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteManager.fulfilled, (state, action) => {
        if (Array.isArray(state.list)) {
          state.list = state.list.filter((m) => m._id !== action.payload);
        } else {
          console.warn(
            "state.list is not an array during deletion:",
            state.list
          );
          state.list = [];
        }
      })
      .addCase(updateManager.fulfilled, (state, action) => {
        console.log("Update payload:", action.payload);
        console.log("State list:", state.list);

        if (Array.isArray(state.list)) {
          const index = state.list.findIndex(
            (m) => m._id === action.payload._id
          );
          if (index !== -1) state.list[index] = action.payload;
        } else {
          console.warn("Expected state.list to be an array, got:", state.list);
        }
      });
  },
});

export default adminSlice.reducer;
