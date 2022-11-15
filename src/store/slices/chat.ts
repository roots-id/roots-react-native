import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: {},
  },
  reducers: {
    initiateChat(state, action: PayloadAction<any>): any {
      // add dummy contact
      // const chatId = uuid.v4() as string;
      const newChat = {
        _id: action.payload.chatId,
        messages: []
      }
      state.chats[action.payload.chatId] = newChat;
    },
    addMessage(state, action: PayloadAction<any>) {
      // add dummy contact
      const { chatId, message } = action.payload;
      if(state.chats[chatId]) {
        state.chats[chatId].messages.push(message);
      }
    }
  },
});

export const { initiateChat, addMessage } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
