import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const CONTACTS = [
  {
    _id: 1,
    displayPictureUrl:
      'https://avatars.githubusercontent.com/u/95590918?s=200&v=4',
    displayName: 'RootsHelper',
  },
  {
    _id: 2,
    displayPictureUrl:
      'https://avatars.githubusercontent.com/u/11140484?s=200&v=4',
    displayName: 'PrismBot',
  },
  {
    _id: 3,
    displayPictureUrl: 'https://avatars.githubusercontent.com/u/681493?v=4',
    displayName: 'Lance',
    isCurrentUser: true,
  },
  {
    _id: 4,
    displayPictureUrl:
      'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png',
    displayName: 'Esteban Garcia',
  },
  {
    _id: 5,
    displayPictureUrl: 'https://avatars.githubusercontent.com/u/2913773?v=4',
    displayName: 'Rodolfo Johns',
  },
  {
    _id: 6,
    displayPictureUrl:
      'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png',
    displayName: 'MeGrimLance Steven',
  },
];

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: CONTACTS,
  },
  reducers: {
    addContact(state, action: PayloadAction<any>) {
      state.contacts.push(action.payload);
    }
  },
});

export const { addContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
