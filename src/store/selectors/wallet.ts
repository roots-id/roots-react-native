import { createSelector } from 'reselect';

const walletSelector = (state: any) => state.wallet;

export const getWallet = createSelector(walletSelector, (state) => {
  return state.wallet;
});

export const getWalletExists = createSelector(walletSelector, (state) => {
  return Boolean(state.wallet);
});

export const getIsPinProtected = createSelector(walletSelector, (state) => {
  return !!state.wallet?.pinProtected;
});

export const getWalletPin = createSelector(walletSelector, (state) => {
  return state.wallet?.pin ?? '';
});

export const getProfile = createSelector(walletSelector, (state) => {
  return state.profile;
});