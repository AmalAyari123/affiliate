<<<<<<< HEAD
// app/navigation/CommissionNavigator.js
=======
// app/navigation/CampaignNavigator.js
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Commissions from '../screens/Comissions';
import Payment from '../screens/Payment';
import TransactionDetails from '../screens/TransactionDetails';
<<<<<<< HEAD
import WithdrawHistory from '../screens/WithdrawHistory';
=======
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908

const Stack = createStackNavigator();

const CommissionNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Commission" component={Commissions} />
    <Stack.Screen name="payment" component={Payment} />
    <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
<<<<<<< HEAD
    <Stack.Screen name="WithdrawHistory" component={WithdrawHistory} />
=======
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
  </Stack.Navigator>
);

export default CommissionNavigator;
