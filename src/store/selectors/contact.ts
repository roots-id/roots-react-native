import { createSelector } from 'reselect';
import { BOTS_NAMES } from '../../common/constants';

const contactSelector = (state: any) => state.contact;

export const getContacts = createSelector(contactSelector, (state) => {
  return state.contacts.filter((contact) => contact._id !== 'RootsIDClient');
});

export const getCurrentUserContact = createSelector(
  contactSelector,
  (state) => {
    console.log(state.contacts)
    return state.contacts.find((contact) => contact._id =='rootUser');
  }
);

export const getContactById = createSelector(contactSelector, (state) => (id) => {
    return state.contacts.find((contact) => contact._id === id);
});
