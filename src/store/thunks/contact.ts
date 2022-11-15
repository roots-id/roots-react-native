import { createAsyncThunk } from '@reduxjs/toolkit'
import { addContact } from '../slices/contact';

const BASE_CONTACT = 'contact/';
const CREATE_CONTACT = `${BASE_CONTACT}create`;

export const createContact = createAsyncThunk(
    CREATE_CONTACT,
  async (contact: any, thunkAPI: any) => {
    const state = thunkAPI.getState();
    const dummyContact = {
        _id: state.contact.contacts.length + 1,
        displayPictureUrl: contact.displayPictureUrl,
        displayName: contact.displayName,
        ...(contact.isCurrentUser ? { isCurrentUser: true} : {})
      }
    thunkAPI.dispatch(addContact(dummyContact));
    return dummyContact._id;
  }
)