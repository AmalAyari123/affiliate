// app/navigation/CampaignNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Banners from '../screens/Banners';
import BannerDetails from '../screens/BannerDetails';

const Stack = createStackNavigator();

const BannerNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Banners" component={Banners} />
    <Stack.Screen name="BannerDetails" component={BannerDetails} />
  </Stack.Navigator>
);

export default BannerNavigator;
