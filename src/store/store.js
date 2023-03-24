import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies'
import authReducer from './auth';
import notificationReducer from './notification';

export const store = configureStore({
  reducer: {
    allMovies: moviesReducer,
    auth: authReducer,
    notification: notificationReducer
  }
});

