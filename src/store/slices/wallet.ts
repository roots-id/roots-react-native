import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: null,
  },
  reducers: {
    addWallet(state, action: PayloadAction<any>): any {
      state.wallet = action.payload;
    }
  }
});

export const { addWallet } = walletSlice.actions;
export const walletReducer = walletSlice.reducer;
