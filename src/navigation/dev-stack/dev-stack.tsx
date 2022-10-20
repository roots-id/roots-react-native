import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DeveloperScreen from '../../screens/DeveloperScreen';
import WalletScreen from '../../screens/WalletScreen';
import { ROUTE_NAMES } from './../constants';

const Stack = createStackNavigator();

export function DevStack() {
  console.log('DevStack - ');
  return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name={ ROUTE_NAMES.DEVELOPER } component={DeveloperScreen} />
          {/* <Stack.Screen name="Communications" component={CommunicationsScreen}/> */}
          <Stack.Screen name={ ROUTE_NAMES.WALLET } component={WalletScreen} />
          {/* <Stack.Screen name="Mediator" component={MediatorScreen}/> */}
          {/* <Stack.Screen name="RequestCredential" component={RequestCredentialScreen}/> */}
          {/* <Stack.Screen name="Sidetree" component={Sidetree}/> */}
        </Stack.Group>
      </Stack.Navigator>
    );
}
