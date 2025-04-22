import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// FETCH all managers
export const fetchManagers = createAsyncThunk('managers/fetch', async () => {
  const res = await axios.get('/api/managers');
  return res.data;
});

// ADD new manager
export const addManager = createAsyncThunk('managers/add', async (manager) => {
  const res = await axios.post('/api/managers', manager);
  return res.data;
});

// DELETE manager
export const deleteManager = createAsyncThunk('managers/delete', async (id) => {
  await axios.delete(`/api/managers/${id}`);
  return id;
});

// UPDATE manager
export const updateManager = createAsyncThunk('managers/update', async (manager) => {
  const res = await axios.put(`/api/managers/${manager._id}`, manager);
  return res.data;
});

const managersSlice = createSlice({
  name: 'managers',
  initialState: {
    list: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addManager.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteManager.fulfilled, (state, action) => {
        state.list = state.list.filter(m => m._id !== action.payload);
      })
      .addCase(updateManager.fulfilled, (state, action) => {
        const index = state.list.findIndex(m => m._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      });
  }
});

export default managersSlice.reducer;
