import { createSelector } from 'reselect';

const credentialSelector = (state: any) => state.credential;

export const getVerifiedCredentials = createSelector(credentialSelector, (state) => {
  return state.credentials
});

export const getVerifiedCredentialById = createSelector(credentialSelector, (state) => (id) => {
  return state.credentials.find((cred) => cred._id === id);
});