import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_HOST}/${import.meta.env.VITE_PRODUCT_API}`,
});

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async () => {
    const response = await api.get('/');
    return response.data;
  },
);

export const getCatalogProducts = createAsyncThunk(
  'products/getCatalogProducts',
  async (catalog) => {
    const response = await api.get(`/${catalog}`);
    return response.data;
  },
);

export const getCategoryProducts = createAsyncThunk(
  'products/getCategoryProducts',
  async ({ catalog, category }) => {
    const response = await api.get(`/${catalog}/${category}`);
    return response.data;
  },
);

export const getSpecificProduct = createAsyncThunk(
  'products/getSpecificProduct',
  async ({ catalog, category, id }) => {
    const response = await api.get(`/${catalog}/${category}/${id}`);
    return response.data;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      if (JSON.stringify(state) !== JSON.stringify(action.payload)) {
        return action.payload;
      }
      return state;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      if (action.error) {
        console.error(action.error);
      }
    });

    builder.addCase(getCatalogProducts.fulfilled, (state, action) => {
      if (JSON.stringify(state) !== JSON.stringify(action.payload)) {
        return action.payload;
      }
      return state;
    });
    builder.addCase(getCatalogProducts.rejected, (state, action) => {
      if (action.error) {
        console.error(action.error);
      }
    });

    builder.addCase(getCategoryProducts.fulfilled, (state, action) => {
      if (JSON.stringify(state) !== JSON.stringify(action.payload)) {
        return action.payload;
      }
      return state;
    });
    builder.addCase(getCategoryProducts.rejected, (state, action) => {
      if (action.error) {
        console.error(action.error);
      }
    });

    builder.addCase(getSpecificProduct.fulfilled, (state, action) => {
      if (JSON.stringify(state) !== JSON.stringify(action.payload)) {
        return action.payload;
      }
      return state;
    });
    builder.addCase(getSpecificProduct.rejected, (state, action) => {
      if (action.error) {
        console.error(action.error);
      }
    });
  },
});

export default productsSlice.reducer;
