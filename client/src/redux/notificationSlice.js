import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../helpers/localStorage";

const notificationData = getItem("notifications") || [];

const initialState = {
  notificationData: notificationData,
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
