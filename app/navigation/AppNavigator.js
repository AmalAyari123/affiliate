import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedNavigator from "./FeedNavigator";
import transactions from "../screens/transactions";
import DataAffiliate from "../screens/DataAffiliate";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CartScreen from "../screens/CartScreen";


const Tab = createBottomTabNavigator();

const AppNavigator = () =>  {

  return (
  <Tab.Navigator
     screenOptions={{
    tabBarActiveTintColor: '#E67E22',      // Active icon/text color
    tabBarInactiveTintColor: '#B0B0B0',   // Inactive icon/text color
    tabBarIconStyle: {                     // Icon style (size, margin, etc.)
      // This can style the icon container, but not the icon itself directly
    },
    tabBarLabelStyle: { fontSize: 12 },   // Tab text style (optional)
    tabBarStyle: {                        // TabBar style
      backgroundColor: '#fff',            // Example: white background
      height: 70,                         // Custom height (optional)
    },
  }}
  >
    <Tab.Screen
      name="Marketplace"
      component={FeedNavigator}
      options={{
        title: "Marketplace",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
        headerShown: false, // Hide the header at the top

      }}

      
    />
    <Tab.Screen
      name="Product"
      component={CartScreen}
     options={{
        title: "Product",
        tabBarIcon: ({ color, size }) => (
          <Feather name="box" color={color} size={size} />
        ),
        headerShown: false, // Hide the header at the top

      }}

    />
    <Tab.Screen
      name="Performance"
     component={DataAffiliate}
      options={{
        title: "Performance",

        tabBarIcon: ({ color, size }) => (
<FontAwesome6 name="hands-clapping" size={size} color={color} />        ),
        headerShown: false, // Hide the header at the top

      }}
    />
        <Tab.Screen
      name="Transactions"
      component={transactions}
      options={{
        title: "Transactions",

        tabBarIcon: ({ color, size }) => (
<FontAwesome6 name="circle-dollar-to-slot" size={size} color={color} />        ),
        headerShown: false, // Hide the header at the top

      }}
    />
  </Tab.Navigator>
)};

export default AppNavigator;
