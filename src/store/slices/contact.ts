import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
  },
  reducers: {
    addContact(state, action: PayloadAction<any>): any {
      state.contacts.push(action.payload);
    },
    updateContact(state, action: PayloadAction<any>): any {
      const { _id, ...rest } = action.payload;
      const contactIndex = state.contacts.findIndex(contact => contact._id === _id);
      if(contactIndex >= 0) {
        state.contacts[contactIndex] = { ...state.contacts[contactIndex], ...rest };
      }
    }
  }
});

export const { addContact, updateContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
