import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCatalogs = createAsyncThunk(
  'catalogs/getCatalogs',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST}/${import.meta.env.VITE_CATALOG_API}`,
    );
    return response.data;
  },
);

const catalogsSlice = createSlice({
  name: 'catalogs',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCatalogs.fulfilled, (state, action) => {
      state.loading = false;
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.data = action.payload;
      }
    });
    builder.addCase(getCatalogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default catalogsSlice.reducer;
