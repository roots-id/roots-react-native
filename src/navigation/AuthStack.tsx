import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateWalletScreen from '../screens/CreateWalletScreen';
import LoginScreen from '../screens/LoginScreen';
import { ROUTE_NAMES } from './constants';
import SettingsScreen from '../screens/SettingsScreen';
import SaveScreen from '../screens/SaveScreen';
import { DevStack } from './dev-stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AuthStack() {
  console.log('AuthStack - Determining which auth screen to use.');
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={ROUTE_NAMES.CREATE_WALLET}
        component={CreateWalletScreen}
      />
      <Stack.Screen name={ROUTE_NAMES.LOGIN} component={LoginScreen} />
      <Stack.Group
        navigationKey={'main'}
        screenOptions={{ presentation: 'transparentModal' }}
      >
        <Stack.Screen name={ROUTE_NAMES.SETTINGS} component={SettingsScreen} />
        <Stack.Screen name={ROUTE_NAMES.SAVE} component={SaveScreen} />
        <Stack.Screen name={ROUTE_NAMES.DEVELOPERS} component={DevStack} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
