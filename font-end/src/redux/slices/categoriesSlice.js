import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';
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
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
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

export default categoriesSlice.reducer;
