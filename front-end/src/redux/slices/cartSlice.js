import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_HOST}/${import.meta.env.VITE_CART_API}`,
});

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`getCart/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addToCart = createAsyncThunk(
  '/cart/addToCart',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/addToCart/${userId}`, {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeFromCart = createAsyncThunk(
  '/cart/removeFromCart',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/removeFromCart/${userId}`, {
        productId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateQuantity = createAsyncThunk(
  '/cart/updateQuantity',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/updateQuantity/${userId}`, {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: { data: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    //getCart-------
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    //addToCart-------
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    //removeFromCart-------
    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    //updateQuantity-------
    builder.addCase(updateQuantity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default cartSlice.reducer;
