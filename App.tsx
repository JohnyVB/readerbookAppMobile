import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Navigator } from './src/router/Navigator';
import { AuthProvider } from './src/context/auth/AuthContext';
import { PropsProvider } from './src/interfaces/AppInterfaces';

import SplashScreen from 'react-native-splash-screen'

const AppState = ({children}: PropsProvider) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App;
