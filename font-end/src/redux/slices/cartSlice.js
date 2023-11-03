import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;
      if (state[productId]) {
        state[productId] += quantity;
      } else {
        state[productId] = quantity;
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
