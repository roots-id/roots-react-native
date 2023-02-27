import { createSelector } from 'reselect';

const identifierSelector = (state: any) => state.identifier;

export const getIdentifiers = createSelector(identifierSelector, (state) => {
  return state.identifiers
});

export const getIdentifierById = createSelector(identifierSelector, (state) => (id) => {
  return state.identifiers.find((identifier) => identifier._id === id);
});
