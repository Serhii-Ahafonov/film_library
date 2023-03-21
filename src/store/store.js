import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies'
import authReducer from './auth';

export const store = configureStore({
  reducer: {
    allMovies: moviesReducer,
    auth: authReducer
  }
});

