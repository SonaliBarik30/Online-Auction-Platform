import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import biddingReducer from './slices/biddingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    bidding: biddingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});