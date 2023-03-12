import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LocalStorageService } from '../services';
import { USER_AUTH } from '../common/constants';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletExists } from '../store/selectors/wallet';
import { MessageType } from '../models/constants';
import {addMsgMetadata } from './../helpers/messages';
import { addContact } from '../store/slices/contact';
import {initiateChat, addMessage} from '../store/slices/chat';

import { sendMessageToChat } from '../store/thunks/chat';
const localStorageService = new LocalStorageService();

export const AuthContext = React.createContext({});

export default function Routes() {
  console.log('Routes - navigation/Routes');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const walletExists = useSelector(getWalletExists);
  const dispatch = useDispatch();

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // await localStorageService.persist(
        //   USER_AUTH,
        //   JSON.stringify({ id: 'user_5', token: 'jwttoken' })
        // );
        // setLoggedIn(true);
      },
    }),
    []
  );

  useEffect(() => {
  setLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
