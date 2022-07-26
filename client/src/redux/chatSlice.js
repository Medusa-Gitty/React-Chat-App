import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  chats: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setSelectedChat(state, payload) {
      state.selectedChat = payload.payload;
    },
    setChats(state, payload) {
      state.chats = payload.payload;
    },
  },
});

export default chatSlice;

export const chatSliceActions = chatSlice.actions;
