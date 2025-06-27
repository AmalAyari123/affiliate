// app/navigation/CampaignNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Commissions from '../screens/Comissions';
import Payment from '../screens/Payment';

const Stack = createStackNavigator();

const CommissionNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Commission" component={Commissions} />
    <Stack.Screen name="payment" component={Payment} />
  </Stack.Navigator>
);

export default CommissionNavigator;
