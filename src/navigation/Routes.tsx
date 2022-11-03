import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LocalStorageService } from '../services';
import { USER_AUTH } from '../common/constants';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const localStorageService = new LocalStorageService();

export const AuthContext = React.createContext({});

export default function Routes() {
  console.log('Routes - navigation/Routes');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        await localStorageService.persist(
          USER_AUTH,
          JSON.stringify({ id: 'user_5', token: 'jwttoken' })
        );
        setLoggedIn(true);
      },
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const userExists = await localStorageService.fetch(USER_AUTH);
      setLoggedIn(!!userExists);
    };
    fetchData();
    // localStorageService.clear();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
