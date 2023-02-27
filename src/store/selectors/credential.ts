import { createSelector } from 'reselect';

const credentialSelector = (state: any) => state.credential;

export const getVerifiedCredentials = createSelector(credentialSelector, (state) => {
  return state.credentials
});

export const getVerifiedCredentialById = createSelector(credentialSelector, (state) => (id) => {
  
  const index = state.credentials.findIndex((cred) => cred._id === id);
  const credential = index !== -1 ? state.credentials[index] : undefined;
  return { credential, index };
});