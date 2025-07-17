import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, DollarSign, Users, Eye, Bell, Gift, Target, Zap, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { useLanguage } from '../hooks/useLanguage';
import AppHeader from '../components/AppHeader';
import { getAffiliateAccount, getCustomerProfile } from '../api/authApi';
import { getTotalClicks } from '../api/campaignApi';

const Dashboard = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const [account, setAccount] = useState({ 
    total_commission: 0,
    balance: 0,
    holding_balance: 0 
  });
  const [customerProfile, setCustomerProfile] = useState({
    firstname: '',
    lastname: ''
  });
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch account data
      const accountRes = await getAffiliateAccount();
      if (accountRes.success) {
        setAccount({
          total_commission: accountRes.data.total_commission || 0,
          balance: accountRes.data.balance || 0,
          holding_balance: accountRes.data.holding_balance || 0,
        });
      }
      
      // Fetch customer profile data
      const profileRes = await getCustomerProfile();
      if (profileRes.success) {
        setCustomerProfile({
          firstname: profileRes.data.firstname || '',
          lastname: profileRes.data.lastname || ''
        });
      }
      
      // Fetch total clicks from campaigns
      const clicksRes = await getTotalClicks();
      if (clicksRes.success) {
        setTotalClicks(clicksRes.data);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView>
        {/* Rest of the component content */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Add any other styles you need here
});

export default Dashboard; 