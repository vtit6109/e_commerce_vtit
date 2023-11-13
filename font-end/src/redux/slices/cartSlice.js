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

export const addToCart = createAsyncThunk('/cart/addToCart', async ({userId, productId}, { rejectWithValue }) => {
  try {
    const response = await api.post(`/addToCart/${userId}`, { productId });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { cart: {} },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
          state.cart = action.payload;
      });
    },
});

export default cartSlice.reducer;
