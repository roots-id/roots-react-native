import { createAsyncThunk } from '@reduxjs/toolkit';
import { encodeCredential } from '../../models/samples/credentials';
import { addCredential, updateCredential } from '../slices/credential';

const BASE_CREDENTIAL = 'credentials/';
const CREATE_CREDENTIAL = `${BASE_CREDENTIAL}create`;
const CREATE_ADD_CREDENTIAL = `${BASE_CREDENTIAL}createAndAdd`;
const ADD_CREDENTIAL_TO_LIST = `${BASE_CREDENTIAL}addToList`;
const UPDATE_CREDENTIAL_VALIDATION = `${BASE_CREDENTIAL}credential_validation`;



export const addCredentialToList = createAsyncThunk(
  ADD_CREDENTIAL_TO_LIST,
  async (credential: any, thunkAPI: any) => {
    thunkAPI.dispatch(addCredential(credential));
    return credential;
  }
);

const ACCEPT_CREDENTIAL_OFFER = `${BASE_CREDENTIAL}createCredentialThunk`;
export const acceptCredentialOffer = createAsyncThunk(
  ACCEPT_CREDENTIAL_OFFER,
  async (credential: any, thunkAPI: any) => {
    const state = thunkAPI.getState();
    const findCredentialIndex = state.credential.credentials.findIndex(cred => cred._id === credential._id);
    //need to call agent to accept the offer
    console.log('found credential index', state.credential.credentials)
    if( findCredentialIndex > -1) {
      thunkAPI.dispatch(
        updateCredential({ index: findCredentialIndex, credential: credential})
      );
    }
    return true;
  }
);

const DENY_CREDENTIAL_OFFER = `${BASE_CREDENTIAL}denyCredentialOffer`;
export const denyCredentialOffer = createAsyncThunk(
  DENY_CREDENTIAL_OFFER,
  async (credential: any, thunkAPI: any) => {
    const state = thunkAPI.getState();
    const findCredentialIndex = state.credential.credentials.findIndex(cred => cred._id === credential._id);
    if( findCredentialIndex > -1) {
      thunkAPI.dispatch(
        updateCredential({ index: findCredentialIndex, credential: credential})
      );
    }
    return false;
  }
);




export const updateCredentialValidation = createAsyncThunk(
  UPDATE_CREDENTIAL_VALIDATION,
  async (credential: any, thunkAPI: any) => {
    const state = thunkAPI.getState();
    const findCredentialIndex = state.credential.credentials.findIndex(cred => cred._id === credential._id);
    if( findCredentialIndex > -1) {
      thunkAPI.dispatch(
        updateCredential({ index: findCredentialIndex, credential: credential})
      );
    }
    return true;
  }
);
