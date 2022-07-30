import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    chatData: chatSlice.reducer,
    notificationData: notificationSlice.reducer,
  },
});

export default store;
