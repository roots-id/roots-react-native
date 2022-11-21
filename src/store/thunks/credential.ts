import { createAsyncThunk } from '@reduxjs/toolkit'
import { addCredential, updateCredential } from '../slices/credential';

const BASE_CREDENTIAL = 'credentials/';
const CREATE_CREDENTIAL = `${BASE_CREDENTIAL}create`;
const UPDATE_CREDENTIAL_VALIDATION = `${BASE_CREDENTIAL}credential_validation`;

export const createCredential = createAsyncThunk(
    CREATE_CREDENTIAL,
  async (credential: any, thunkAPI: any) => {
    const state = thunkAPI.getState();
    const dummyCredential = {
        _id: state.credential.credentials.length + 1,
        alias: `Dummy${state.credential.credentials.length + 1}_credentialAlias`,
        verifiedCredential: {
          encodedSignedCredential: `Dummy${state.credential.credentials.length + 1}_verifiedCredential_${Date.now()}`,
          proof: {
            hash: `Dummy${state.credential.credentials.length + 1}_proofHash_${Date.now()}`,
            index: state.credential.credentials.length,
          },
        },
        issuerId: credential.issuerId,
        revoked: credential.revoked
      }
    thunkAPI.dispatch(addCredential(dummyCredential));
    return dummyCredential;
  }
)

export const updateCredentialValidation = createAsyncThunk(
    UPDATE_CREDENTIAL_VALIDATION,
  async (credential: any, thunkAPI: any) => {
    const isRevoked = !!(credential.verifiedCredential.proof.index % 2);
    thunkAPI.dispatch(updateCredential({...credential, revoked: isRevoked, index: credential.verifiedCredential.proof.index}));
    return isRevoked;
  }
)