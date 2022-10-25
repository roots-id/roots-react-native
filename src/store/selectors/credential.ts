import { createSelector } from 'reselect';

const credentialSelector = (state: any) => state.credential;

export const getVerifiedCredentials = createSelector(credentialSelector, (state) => {
  return state.credentials
});
