import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
  },
  reducers: {
    addContact(state, action: PayloadAction<any>): any {
      state.contacts.push(action.payload);
    }
  }
});

export const { addContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
