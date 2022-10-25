import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
  },
  reducers: {
    
  },
});

// export const { addContact, getContacts, getCurrentUserContact, getContactById } = contactSlice.actions;
export const chatReducer = chatSlice.reducer;
