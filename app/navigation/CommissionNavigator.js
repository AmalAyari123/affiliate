// app/navigation/CommissionNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Commissions from '../screens/Comissions';
import Payment from '../screens/Payment';
import TransactionDetails from '../screens/TransactionDetails';
import WithdrawHistory from '../screens/WithdrawHistory';

const Stack = createStackNavigator();

const CommissionNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Commission" component={Commissions} />
    <Stack.Screen name="payment" component={Payment} />
    <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
    <Stack.Screen name="WithdrawHistory" component={WithdrawHistory} />
  </Stack.Navigator>
);

export default CommissionNavigator;
