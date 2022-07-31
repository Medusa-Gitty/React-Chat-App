import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";
import notificationSlice from "./notificationSlice";
import fetchAgainSlice from "./fetchAgainSlice";

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    chatData: chatSlice.reducer,
    notificationData: notificationSlice.reducer,
    fetchAgain: fetchAgainSlice.reducer,
  },
});

export default store;
