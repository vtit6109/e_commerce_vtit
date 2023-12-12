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
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    //getAllProducts----------
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.data = action.payload;
      }
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    //getCatalogProducts-----------
    builder.addCase(getCatalogProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCatalogProducts.fulfilled, (state, action) => {
      state.loading = false;
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.data = action.payload;
      }
    });
    builder.addCase(getCatalogProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

     //getCategoryProducts--------------
     builder.addCase(getCategoryProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryProducts.fulfilled, (state, action) => {
      state.loading = false;
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.data = action.payload;
      }
    });
    builder.addCase(getCategoryProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    
    //getSpecificProduct--------------
    builder.addCase(getSpecificProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSpecificProduct.fulfilled, (state, action) => {
      state.loading = false;
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.data = action.payload;
      }
    });
    builder.addCase(getSpecificProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default productsSlice.reducer;
