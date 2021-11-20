import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { AuthContext } from '../context/auth/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { HomeDrawer } from './HomeDrawer';

const Stack = createStackNavigator();

export const Navigator = () => {

  const {status} = useContext(AuthContext);

  if (status === 'checking') {
      return (
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      )
  }

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }
        }}
    >

      {
        (status === 'authenticated')
          ? (
              <Stack.Screen name="HomeDrawer" component={HomeDrawer} />  
          ) : (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </>
          )
      }
      
    </Stack.Navigator>
  );
}
