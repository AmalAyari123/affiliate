
import React from 'react';
import {createStackNavigator} from "@react-navigation/stack" ; 

import ListingScreen from '../screens/ListingScreen';
import ListingDetails from '../screens/ListingDetails';
import CartScreen from '../screens/CartScreen';
const  Stack =  createStackNavigator();

const FeedNavigator = () => (

    <Stack.Navigator  mode="modal" screenOptions={{headerShown : false}} >
                <Stack.Screen name="ListingScreen" component={ListingScreen} />

        <Stack.Screen name="ListingDetails" component={ListingDetails} options={{headerShown : false}} />
                <Stack.Screen name="CartScreen" component={CartScreen} options={{headerShown : false}} />




        

    </Stack.Navigator>



);
export default FeedNavigator;

