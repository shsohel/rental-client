import { configureStore } from '@reduxjs/toolkit';
import products from './rent/reducer';

export const store = configureStore({
  reducer: {
    products,
  },
});
