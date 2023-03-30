import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LocalStorageService } from '../services';
import { USER_AUTH } from '../common/constants';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletExists } from '../store/selectors/wallet';
import { MessageType } from '../models/constants';
import { addMsgMetadata } from './../helpers/messages';
import { addContact } from '../store/slices/contact';
import { initiateChat, addMessage } from '../store/slices/chat';

import { sendMessageToChat } from '../store/thunks/chat';
import { loadAgent, handleBackgroundTick } from '../events';
const localStorageService = new LocalStorageService();

export const AuthContext = React.createContext({});

export default function Routes() {
  console.log('Routes - navigation/Routes');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const walletExists = useSelector(getWalletExists);
  const dispatch = useDispatch();

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
      },
    }),
    []
  );

  useEffect(() => {
    // should check for messaes from mediator 
    loadAgent(dispatch)
    setLoggedIn(true);
  }, []);

  useEffect(() => {
    const firstDelay = 3000; // 3 seconds
    const intervalDuration = 1000; // 1 second

    const handleInterval = () => {
      handleBackgroundTick()
    };

    const initialTimeout = setTimeout(() => {
      handleInterval();
      const interval = setInterval(handleInterval, intervalDuration);

      return () => {
        clearInterval(interval);
      };
    }, firstDelay);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
