import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: false
  },
  reducers: {
    setNotification: (state, action) => {
      return { notification: action.payload };
    },
  }
});

export const setNotification = notificationSlice.actions.setNotification;
export default notificationSlice.reducer;