import {configureStore} from '@reduxjs/toolkit';
import itemDataSlice from './slices/storiesDataSlice';

export const store = configureStore({
  reducer: itemDataSlice,
  devTools: process.env.NODE_ENV !== 'production',
});