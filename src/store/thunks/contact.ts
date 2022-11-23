import { createAsyncThunk } from '@reduxjs/toolkit'
import { MOCK_CONTACT_PREFIX_ID } from '../constants/mocks';
import { addContact } from '../slices/contact';

const BASE_CONTACT = 'contact/';
const CREATE_CONTACT = `${BASE_CONTACT}create`;

export const createContact = createAsyncThunk(
    CREATE_CONTACT,
  async (contact: any, thunkAPI: any) => {
    const dummyContact = {
        _id: `${MOCK_CONTACT_PREFIX_ID}:${Date.now()}`,
        displayPictureUrl: contact.displayPictureUrl,
        displayName: contact.displayName,
        ...(contact.isCurrentUser ? { isCurrentUser: true} : {})
      }
    thunkAPI.dispatch(addContact(dummyContact));
    return dummyContact._id;
  }
)