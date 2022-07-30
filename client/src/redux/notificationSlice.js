import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationData: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, payload) {
      state.notificationData = payload.payload;
    },
  },
});

export default notificationSlice;

export const notificationSliceActions = notificationSlice.actions;
