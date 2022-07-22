import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    chatData: chatSlice.reducer,
  },
});

export default store;
