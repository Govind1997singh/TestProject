import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import EventListScreen from '../screens/EventListScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Events" component={EventListScreen}  options={{ headerShown: false }}  />
      <Stack.Screen name="Favorites" component={FavoritesScreen}  options={{ headerShown: false }}  />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
