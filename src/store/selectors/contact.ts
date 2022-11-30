import { createSelector } from 'reselect';
import { BOTS_NAMES } from '../../common/constants';

const contactSelector = (state: any) => state.contact;

export const getContacts = createSelector(contactSelector, (state) => {
  return state.contacts.filter(
    (contact) =>
      contact.displayName !== BOTS_NAMES.ROOTS_HELPER &&
      contact.displayName !== BOTS_NAMES.PRISM_BOT
  ).map(contact => contact.isCurrentUser ? {...contact, displayName: 'Activity Log'} : contact);
});

export const getCurrentUserContact = createSelector(
  contactSelector,
  (state) => {
    return state.contacts.find((contact) => contact.isCurrentUser);
  }
);

export const getRootsHelperContact = createSelector(
  contactSelector,
  (state) => {
    return state.contacts.find((contact) => contact.displayName === BOTS_NAMES.ROOTS_HELPER );
  }
);

export const getPrismBotContact = createSelector(
  contactSelector,
  (state) => {
    return state.contacts.find((contact) => contact.displayName === BOTS_NAMES.PRISM_BOT );
  }
);

export const getContactById = createSelector(contactSelector, (state) => (id) => {
    return state.contacts.find((contact) => contact._id === id);
});
