import { createAsyncThunk } from '@reduxjs/toolkit'
import { addContact } from '../slices/contact';

const BASE_CONTACT = 'contact/';
const CREATE_CONTACT = `${BASE_CONTACT}create`;

export const createContact = createAsyncThunk(
    CREATE_CONTACT,
  async (contact: any, thunkAPI: any) => {
    thunkAPI.dispatch(addContact(contact));
    return contact._id;
  }
)