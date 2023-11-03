import { configureStore } from '@reduxjs/toolkit';
import catalogsReducer from './slices/catalogsSlice';
import categoriesReducer from './slices/categoriesSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from '../redux/slices/cartSlice';
import userSlice from '../redux/slices/userSlice';

export const store = configureStore({
  reducer: {
    catalogs: catalogsReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    user: userSlice,
  },
});
