import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setSelectedChat(state, payload) {
      state.selectedChat = payload;
    },
    setChats(state, payload) {
      state.chats.push(payload);
    },
  },
});

export default chatSlice;

export const chatSliceActions = chatSlice.actions;
