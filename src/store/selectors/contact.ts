import { createSelector } from 'reselect';

const contactSelector = (state: any) => state.contact;

export const getContacts = createSelector(contactSelector, (state) => {
  return state.contacts.filter(
    (contact) =>
      contact.displayName !== 'RootsHelper' &&
      contact.displayName !== 'PrismBot'
  );
});

export const getCurrentUserContact = createSelector(
  contactSelector,
  (state) => {
    return state.contacts.find((contact) => contact.isCurrentUser);
  }
);

export const getContactById = createSelector(contactSelector, (state) => (id) => {
    return state.contacts.find((contact) => contact._id === id);
});
