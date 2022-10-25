import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const VERIFIED_CREDENTIALS = [
  {
    alias: 'dummy_credentialAlias',
    verifiedCredential: {
      encodedSignedCredential: 'dummy_vcEncodedSignedCredential',
      proof: {
        hash: 'dummy_proofHash',
        index: 0,
      },
    },
  },
];

const credentialSlice = createSlice({
  name: 'credentials',
  initialState: {
    credentials: VERIFIED_CREDENTIALS,
  },
  reducers: {
    addCredential(state, action: PayloadAction<any>) {
      state.credentials.push(action.payload);
    },
  },
});

export const { addCredential } = credentialSlice.actions;
export const credentialReducer = credentialSlice.reducer;
