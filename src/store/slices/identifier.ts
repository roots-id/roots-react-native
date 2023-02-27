import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const idSlice = createSlice({
  name: 'identifiers',
  initialState: {
    identifiers: [],
  },
  reducers: {
    addId(state, action: PayloadAction<any>) {
      state.identifiers.push(action.payload);
    },
    updateId(state, action: PayloadAction<any>) {
      state.identifiers[action.payload.index] = action.payload.identifier;
    },
    updateDidDocument(state, action: PayloadAction<any>) {
      state.identifiers[action.payload.index].resolution = action.payload.didDocument
    }
  },
});

export const { addId, updateId, updateDidDocument} = idSlice.actions;
