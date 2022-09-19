import { StatusBar } from 'expo-status-bar';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Providers from "./src/navigation";

export default function App() {
    console.log("Starting App")
  return (
      <PaperProvider theme={theme}>
          <Providers/>
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
