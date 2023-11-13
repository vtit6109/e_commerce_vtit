import { configureStore } from '@reduxjs/toolkit';
import catalogsSlice from './slices/catalogsSlice';
import categoriesSlice from './slices/categoriesSlice';
import productsSlice from './slices/productsSlice';
import userSlice from '../redux/slices/userSlice';
import cartSlice from '../redux/slices/cartSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    catalogs: catalogsSlice,
    categories: categoriesSlice,
    cart : cartSlice,
  },
});
