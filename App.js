import React, {useState} from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/AppNavigator';

function App() {
  return (
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
  );
}

export default App;
