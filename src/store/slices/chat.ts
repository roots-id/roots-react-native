import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: {},
  },
  reducers: {
    initiateChat(state, action: PayloadAction<any>): any {
      // add dummy chat
      // const chatId = uuid.v4() as string;
      const newChat = {
        _id: action.payload.chatId,
        messages: [],
      }
      console.log("Created chat",newChat._id)
      state.chats[action.payload.chatId] = newChat;
    },
    addMessage(state, action: PayloadAction<any>) {
      // add dummy message
      const { chatId, message } = action.payload;
      if(state.chats[chatId]) {
        state.chats[chatId].messages.push(message);
      }
    },
  updateMessageQuickReplyStatus(state, action: PayloadAction<any>) {
    const {chatId, messageId, keepIt} = action.payload;
    if (state.chats[chatId]) {
      const messageIndex = state.chats[chatId].messages?.findIndex(
          (msg) => msg._id === messageId
      );
      if (
          messageIndex >= 0 &&
          state.chats[chatId].messages[messageIndex]?.quickReplies
      ) {
        state.chats[chatId].messages[messageIndex].quickReplies.keepIt =
            keepIt;
      }
    }
    },

    updateMessage(state, action: PayloadAction<any>) {
      const {chatId, messageId, message} = action.payload;
      if (state.chats[chatId]) {
        const messageIndex = state.chats[chatId].messages?.findIndex(
            (msg) => msg._id === messageId
        );
        if (messageIndex >= 0) {
          state.chats[chatId].messages[messageIndex] = message;
        }
      }
    }
  },
});

export const { initiateChat, addMessage, updateMessageQuickReplyStatus, updateMessage } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
