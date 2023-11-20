import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategories = createAsyncThunk(
  'catalogs/getCategories',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST}/${import.meta.env.VITE_CATEGORY_API}`,
    );
    return response.data;
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.data = action.payload;
      }
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});


export default categoriesSlice.reducer;
