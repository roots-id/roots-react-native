import { Avatar } from 'react-native-paper';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { useState } from 'react';
import LogoTitle from '../components/LogoTitle';
import IconActions from '../components/IconActions';
import CreateWalletScreen from '../screens/CreateWalletScreen';
import LoginScreen from '../screens/LoginScreen';
import RelationshipsScreen from '../screens/RelationshipsScreen';
import CredentialsScreen from '../screens/CredentialsScreen';
import DeveloperScreen from '../screens/DeveloperScreen';
import WalletScreen from '../screens/WalletScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AuthStack() {
  console.log('AuthStack - Determining which auth screen to use.');

  React.useEffect(() => {}, []);

  const Main = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? 'check-bold'
              : 'checkbox-blank-circle-outline';
            return <Avatar.Icon size={20} icon={iconName} />;
          },
          tabBarActiveBackgroundColor: '#362631',
          tabBarInactiveBackgroundColor: '#150510',
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { fontSize: 22 },
        }}
      >
        <Tab.Screen name='Contacts' component={RelationshipsStack} />
        <Tab.Screen name='Credentials' component={CredentialsStack} />
      </Tab.Navigator>
    );
  };
  const RelationshipsStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#150510',
          },
          headerTintColor: '#eeeeee',
          headerTitleStyle: {
            fontSize: 22,
          },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          animationEnabled: true,
        }}
      >
        <Stack.Group>
          <Stack.Screen
            name='Relationships'
            component={RelationshipsScreen}
            options={({ navigation, route }) => ({
              headerTitle: (props) => <LogoTitle {...props} title='Contacts' />,
              headerRight: (props) => (
                <IconActions
                  {...props}
                  nav={navigation}
                  add='Create Rel'
                  person={'user-id-1'}
                  scan='contact'
                  settings='Settings'
                />
              ),
            })}
          />
          <Stack.Screen
            name='Chat'
            component={ChatScreen}
            options={({ navigation, route }) => ({
              headerBackTitle: route.params?.user?.displayName,
              headerTitle: (props) => null,
              headerRight: (props) => (
                <IconActions
                  {...props}
                  nav={navigation}
                  add='Create Rel'
                  person={'user-id-1'}
                  scan='credential'
                  settings='Settings'
                />
              ),
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  };

  const CredentialsStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#150510',
          },
          headerTintColor: '#eeeeee',
          headerTitleStyle: {
            fontSize: 22,
          },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          animationEnabled: true,
        }}
      >
        <Stack.Group>
          <Stack.Screen
            name='VCs'
            component={CredentialsScreen}
            options={({ navigation, route }) => ({
              headerTitle: (props) => (
                <LogoTitle {...props} title='Credentials' />
              ),
              headerRight: (props) => (
                <IconActions
                  {...props}
                  nav={navigation}
                  person={'user-id-1'}
                  scan='credential'
                  settings='Settings'
                />
              ),
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  };
  const DevStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name='Developer' component={DeveloperScreen} />
          {/* <Stack.Screen name="Communications" component={CommunicationsScreen}/> */}
          <Stack.Screen name='Wallet' component={WalletScreen} />
          {/* <Stack.Screen name="Mediator" component={MediatorScreen}/> */}
          {/* <Stack.Screen name="RequestCredential" component={RequestCredentialScreen}/> */}
          {/* <Stack.Screen name="Sidetree" component={Sidetree}/> */}
        </Stack.Group>
      </Stack.Navigator>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Create Wallet' component={CreateWalletScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Group>
        <Stack.Screen name='mainTabs' component={Main} />
      </Stack.Group>
      <Stack.Group
        navigationKey={'init'}
        screenOptions={{ presentation: 'transparentModal' }}
      >
        {/* <Stack.Screen name="Settings" component={SettingsScreen}/> */}
        {/* <Stack.Screen name="Save" component={SaveScreen}/> */}
        <Stack.Screen name='Developers' component={DevStack} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
