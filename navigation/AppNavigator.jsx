import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import EventListScreen from '../screens/EventListScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Img } from '../screens/images';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { logout } from '../redux/slices/authSlice';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Main" component={AppStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
const Profile = ()=>{
  const dispatch = useDispatch()
  return(

    <View>
      <TouchableOpacity onPress={()=>dispatch(logout)}>
        <Text>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  )
}
const AppStack = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Events"  component={EventListScreen} options={{tabBarActiveTintColor:"black", tabBarIcon: ({ color, size }) => (
        <Image resizeMode='contain' source={Img.event}/>
      )}}/>
    <Tab.Screen name="Favorites" component={FavoritesScreen}  options={{tabBarActiveTintColor:"black", tabBarIcon: ({ color, size }) => (
        <Image source={Img.heart} />
      )}}/>

  </Tab.Navigator>
);
export default AppNavigator;
