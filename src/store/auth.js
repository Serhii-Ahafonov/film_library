import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  error: false,
  isLoading: false
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login: () => {
      return { isAuthenticated: true, isLoading: false, error: false };
    },
    logout: () => {
      return { isAuthenticated: false, isLoading: false, error: false };
    },
    setError: (state, action) => {
      return { ...state, errors: action.payload, isLoading: false };
    },
    setLoading: (state, action) => {
      return { ...state, isLoading: action.payload };
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;