import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';
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
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalogs.fulfilled, (state, action) => {
      if (JSON.stringify(state) !== JSON.stringify(action.payload)) {
        return action.payload;
      }
      return state;
    });
    builder.addMatcher(isFulfilled, (state, action) => {
      if (action.error) {
        console.error(action.error);
      }
    });
  },
});

export default catalogsSlice.reducer;
