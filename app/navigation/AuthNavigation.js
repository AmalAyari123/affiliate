import React from 'react';
import {createStackNavigator} from "@react-navigation/stack" ; 
import AuthScreen from '../screens/register';
import ListingScreen from '../screens/ListingScreen';
import OnboardingScreen from '../screens/onBoardingScreen/BoardingScreen';
import LoginScreen from '../screens/LoginScreen';
const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
  
  
  <Stack.Navigator>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={AuthScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

  </Stack.Navigator>
)}
export default AuthNavigation;