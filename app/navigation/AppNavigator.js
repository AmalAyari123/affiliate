import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Chrome as Home, Users, DollarSign, ChartBar as BarChart3, User, Target, Image as ImageIcon } from 'lucide-react-native';


import FeedNavigator from "./FeedNavigator";
import transactions from "../screens/transactions";
import DataAffiliate from "../screens/DataAffiliate";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CartScreen from "../screens/CartScreen";
import { View, Text, StyleSheet } from 'react-native';
import Banners from "../screens/Banners";
import CampaignNavigator from "./CampaignNavigator";
import Campaignss from "../screens/Campaignss";
import Referrals from "../screens/Referrals";
import Commissions from "../screens/Comissions";
import Analytics from "../screens/Analytics";
import Profile from "../screens/Profile";
import BannerNavigator from "./BannerNavigator";
import CommissionNavigator from "./CommissionNavigator";



const Tab = createBottomTabNavigator();

const AppNavigator = () =>  {

  return (
     <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#E67E22',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tab.Screen
        name="index"
              component={FeedNavigator}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
  <Tab.Screen
  name="campaignTab"
  component={CampaignNavigator}
  options={{
    title: 'Campaigns',
    tabBarIcon: ({ size, color }) => (
      <Target size={size} color={color} />
    ),
  }}
/>

      <Tab.Screen
        name="banners"
              component={BannerNavigator}
        options={{
          title: 'Banners',
          tabBarIcon: ({ size, color }) => (
            <ImageIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="referrals"
             component={Referrals}
        options={{
          title: 'Referrals',
          tabBarIcon: ({ size, color }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="commissions"
              component={CommissionNavigator}
        options={{
          title: 'Commissions',
          tabBarIcon: ({ size, color }) => (
            <DollarSign size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="analytics"
              component={Analytics}
        options={{
          title: 'Analytics',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
              component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
    paddingBottom: 24,
    height: 88,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 8,
    marginTop: 4,
  },
});
