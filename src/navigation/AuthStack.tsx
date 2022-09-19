import {Avatar} from 'react-native-paper';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import React, {useState} from "react";
import CreateWalletScreen from "../screens/CreateWalletScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AuthStack() {
    console.log("AuthStack - Determining which auth screen to use.")

    React.useEffect(() => {
    }, []);

    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Create Wallet" component={CreateWalletScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
            </Stack.Navigator>
    );

}
