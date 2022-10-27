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
      // dummy add credential
      const dummyCredential = {
        alias: `dummy${state.credentials.length + 1}_credentialAlias`,
        verifiedCredential: {
          encodedSignedCredential: `dummy${state.credentials.length + 1}_verifiedCredential_${Date.now()}`,
          proof: {
            hash: `dummy${state.credentials.length + 1}_proofHash_${Date.now()}`,
            index: state.credentials.length,
          },
        },
      }
      state.credentials.push(dummyCredential);
    },
  },
});

export const { addCredential } = credentialSlice.actions;
export const credentialReducer = credentialSlice.reducer;
