import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Navigator } from './src/router/Navigator';
import { AuthProvider } from './src/context/auth/AuthContext';
import { PropsProvider } from './src/interfaces/AppInterfaces';

const AppState = ({children}: PropsProvider) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App;
