// app/navigation/CampaignNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Campaignss from '../screens/Campaignss';
import CampaignDetails from '../screens/CampaignDetails';
import DataAffiliate from '../screens/DataAffiliate';

const Stack = createStackNavigator();

const CampaignNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Campaigns" component={Campaignss} />
    <Stack.Screen name="CampaignDetails" component={CampaignDetails} />
  </Stack.Navigator>
);

export default CampaignNavigator;
