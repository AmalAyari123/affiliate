import React from 'react';
import {createStackNavigator} from "@react-navigation/stack" ; 
import AuthScreen from '../screens/register';
import ListingScreen from '../screens/ListingScreen';
const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
  
  
  <Stack.Navigator>
    <Stack.Screen name="Register" component={AuthScreen}   options={{headerShown :false}}/>
    
  </Stack.Navigator>
)}
export default AuthNavigation;