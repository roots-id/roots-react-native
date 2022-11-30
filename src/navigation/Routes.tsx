import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LocalStorageService } from '../services';
import { USER_AUTH } from '../common/constants';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletExists } from '../store/selectors/wallet';
import { initiateWalletCreation } from '../store/thunks/wallet';

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
    // localStorageService.clear();
    const checkWalletCreation = async () => {
      if (!walletExists) {
        await dispatch(initiateWalletCreation({}));
      }
      setLoggedIn(true);
    };
    checkWalletCreation();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
