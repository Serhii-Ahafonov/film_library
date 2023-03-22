import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  error: false,
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login: () => {
      return { isAuthenticated: true, error: false };
    },
    logout: () => {
      return { isAuthenticated: false, error: false };
    },
    setError: (state, action) => {
      return { ...state, errors: action.payload };
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;