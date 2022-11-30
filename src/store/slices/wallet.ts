import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: null,
    profile: null,
  },
  reducers: {
    addWallet(state, action: PayloadAction<any>): any {
      state.wallet = action.payload;
    },
    changePin(state, action: PayloadAction<any>): any {
      state.wallet.pin = action.payload;
    },
    changePinStatus(state, action: PayloadAction<any>): any {
      state.wallet.pinProtected = action.payload;
    },
    addProfile(state, action: PayloadAction<any>): any {
      state.profile = action.payload;
    },
    changeProfileInfo(state, action: PayloadAction<any>): any {
      state.profile = { ...state.profile, ...action.payload };
    }
  }
});

export const { addWallet, changePin, changePinStatus, addProfile, changeProfileInfo } = walletSlice.actions;
export const walletReducer = walletSlice.reducer;
