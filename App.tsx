import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Navigation from "./src/navigation";

// @ts-ignore
console.disableYellowBox = true;

export default function App() {
    console.log("Starting App")
  return (
      <PaperProvider theme={theme}>
          <Navigation/>
      </PaperProvider>
  );
}

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#e69138',
        accent: '#b0bf93',
        background: '#f9f9f9',
    },
};
