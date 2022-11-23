import { createAsyncThunk } from '@reduxjs/toolkit';
import { encodeCredential } from '../../models/samples/credentials';
import { addCredential, updateCredential } from '../slices/credential';

const BASE_CREDENTIAL = 'credentials/';
const CREATE_CREDENTIAL = `${BASE_CREDENTIAL}create`;
const CREATE_ADD_CREDENTIAL = `${BASE_CREDENTIAL}createAndAdd`;
const ADD_CREDENTIAL_TO_LIST = `${BASE_CREDENTIAL}addToList`;
const UPDATE_CREDENTIAL_VALIDATION = `${BASE_CREDENTIAL}credential_validation`;

export const createCredential = createAsyncThunk(
  CREATE_CREDENTIAL,
  async (credential: any, thunkAPI: any) => {
    const today = new Date(Date.now());

    const decodedSignedCred = {
      id: credential.issuerId,
      keyId: 'issuing0',
      credentialSubject: credential.credSub,
    };
    const proof = {
      hash: today.getMilliseconds().toString(),
      index: 1,
    };
    const encoded = encodeCredential(decodedSignedCred);

    const newCredential = {
      _id: `${credential.issuerId}:cred_${Date.now()}`,
      alias: credential.alias,
      verifiedCredential: {
        encodedSignedCredential: encoded,
        proof,
      },
      issuerId: credential.issuerId,
      revoked: credential.revoked,
    };
    return newCredential;
  }
);

export const createAndAddCredential = createAsyncThunk(
  CREATE_ADD_CREDENTIAL,
  async (credential: any, thunkAPI: any) => {
    const cred = (await thunkAPI.dispatch(createCredential(credential)))
      .payload;
    thunkAPI.dispatch(addCredential(cred));
    return cred;
  }
);

export const addCredentialToList = createAsyncThunk(
  ADD_CREDENTIAL_TO_LIST,
  async (credential: any, thunkAPI: any) => {
    thunkAPI.dispatch(addCredential(credential));
    return credential;
  }
);

export const updateCredentialValidation = createAsyncThunk(
  UPDATE_CREDENTIAL_VALIDATION,
  async (credential: any, thunkAPI: any) => {
    const state = thunkAPI.getState();
    const findCredentialIndex = state.credential.credentials.findIndex(cred => cred._id === credential._id);
    const isRevoked = !!(findCredentialIndex % 2);
    if( findCredentialIndex > -1) {
      thunkAPI.dispatch(
        updateCredential({ index: findCredentialIndex, credential: {
          ...credential,
          revoked: isRevoked,
        }})
      );
    }
    return isRevoked;
  }
);
