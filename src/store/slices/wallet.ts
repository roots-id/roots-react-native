import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createWallet } from '../thunks/wallet';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createWallet.fulfilled, (state, action) => {
      state.wallet = action.payload;
    });
  },
});

export const walletReducer = walletSlice.reducer;
