import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, DollarSign, Users, Eye, Bell, Gift, Target, Zap, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { useLanguage } from '../hooks/useLanguage';
import AppHeader from '../components/AppHeader';
import { getAffiliateAccount, getCustomerProfile } from '../api/authApi';
import { getTotalClicks } from '../api/campaignApi';
import TransactionsContext from '../context/TransactionsContext';
import { useFocusEffect } from '@react-navigation/native';

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
  const [activeReferrals, setActiveReferrals] = useState(0);
  const { transactions, loading: loadingTransactions, error, loadTransactions } = React.useContext(TransactionsContext);

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
    // Calculate unique, non-empty buyer_ids (optionally only for commission transactions)
    if (Array.isArray(transactions)) {
      const uniqueBuyerIds = new Set(
        transactions
          .filter(tx => tx.buyer_id !== null && tx.buyer_id !== undefined && tx.buyer_id !== '' && tx.type === 1)
          .map(tx => String(tx.buyer_id))
      );
      setActiveReferrals(uniqueBuyerIds.size);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleRefresh = async () => {
    await fetchData();
    loadTransactions && loadTransactions();
  };

  const dashboardStats = [
    { title: t('dashboard.totalEarnings'), value: `$${account.total_commission}`, icon: DollarSign, color: '#FF6B35', change: '+12.5%' },
    { title: t('dashboard.activeReferrals'), value: activeReferrals.toString(), icon: Users, color: '#1E40AF', change: '+8.2%' },
    { title: t('dashboard.commissionRate'), value: '15%', icon: TrendingUp, color: '#7C3AED', change: '+2.0%' },
    { title: t('dashboard.totalClicks'), value: totalClicks.toString(), icon: Eye, color: '#059669', change: '+18.7%' },
  ];

  const recentActivities = [
    { type: 'commission', description: t('dashboard.commissionEarned', { name: 'John Doe' }), amount: '+$45.00', time: '2 hours ago' },
    { type: 'referral', description: t('dashboard.newReferralSignup'), amount: 'New user', time: '4 hours ago' },
    { type: 'payment', description: t('dashboard.paymentApproved'), amount: '+$200.00', time: '1 day ago' },
    { type: 'click', description: t('dashboard.bannerClicked', { count: 15 }), amount: '15 clicks', time: '2 days ago' },
  ];

  const promotionalBanners = [
    {
      title: 'Wamia Special Offer',
      subtitle: 'Get 25% extra commission this month!',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Referral Bonus',
      subtitle: 'Earn $50 for every 10 referrals',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtlContainer]} edges={['top']}>
      <AppHeader
        title={t('navigation.dashboard')}
        variant="gradient"
        showLogo={true}
        showActions={true}
      />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loadingTransactions} onRefresh={handleRefresh} />}
      >
        {/* Welcome Section */}
        <View style={[styles.welcomeSection, isRTL && styles.rtlWelcomeSection]}>
          <Text style={[styles.welcomeText, isRTL && styles.rtlText]}>{t('dashboard.welcomeBack')}</Text>
          <Text style={[styles.nameText, isRTL && styles.rtlText]}>
            {customerProfile.firstname && customerProfile.lastname 
              ? `${customerProfile.firstname} ${customerProfile.lastname}`
              : 'Wamia Ambassador'
            }
          </Text>
        </View>

        {/* Promotional Banners */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>
          {promotionalBanners.map((banner, index) => (
            <TouchableOpacity key={index} style={styles.bannerCard}>
              <ImageBackground
                source={{ uri: banner.image }}
                style={styles.bannerImage}
                imageStyle={styles.bannerImageStyle}
              >
                <LinearGradient
                  colors={['rgba(255, 107, 53, 0.8)', 'rgba(30, 64, 175, 0.8)']}
                  style={styles.bannerOverlay}
                >
                  <Text style={[styles.bannerTitle, isRTL && styles.rtlText]}>{banner.title}</Text>
                  <Text style={[styles.bannerSubtitle, isRTL && styles.rtlText]}>{banner.subtitle}</Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stats Grid */}
        <View style={[styles.statsGrid, isRTL && styles.rtlStatsGrid]}>
          {dashboardStats.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                <stat.icon size={24} color={stat.color} />
              </View>
              <Text style={[styles.statValue, isRTL && styles.rtlText]}>{stat.value}</Text>
              <Text style={[styles.statTitle, isRTL && styles.rtlText]}>{stat.title}</Text>
              <View style={[styles.statChange, isRTL && styles.rtlStatChange]}>
                <TrendingUp size={12} color="#059669" />
                <Text style={[styles.changeText, isRTL && styles.rtlText]}>{stat.change}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity - show transactions from last 3 days styled like Comissions.js */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('dashboard.recentActivity')}</Text>
        <View style={styles.activityContainer}>
          {transactions
            .filter(tx => {
              if (!tx.updated_at) return false;
              const txDate = new Date(tx.updated_at);
              const now = new Date();
              const diffTime = now - txDate;
              const diffDays = diffTime / (1000 * 60 * 60 * 24);
              return diffDays <= 3;
            })
            .map((tx, i) => {
              // Style and logic from Comissions.js
              const isCommission = tx.type === 1;
              const isWithdrawal = tx.type === 2;
              const Icon = isCommission ? require('lucide-react-native').ArrowUpCircle : isWithdrawal ? require('lucide-react-native').ArrowDownCircle : require('lucide-react-native').DollarSign;
              const description = isCommission
                ? `Commission earned from ${tx.customer_firstname || tx.extension_attributes?.customer_firstname || ''} ${tx.customer_lastname || tx.extension_attributes?.customer_lastname || ''}'s order`
                : isWithdrawal
                  ? 'Withdrawal'
                  : 'Transaction';
              const amount = isCommission ? `+${tx.amount}` : isWithdrawal ? `-${tx.amount}` : `${tx.amount}`;
              const statusText = tx.status === 3 ? 'Completed' : tx.status === 2 ? 'Pending' : 'Unknown';
              return (
                <View key={tx.transaction_id || i} style={[styles.transactionItem, isRTL && styles.rtlTransactionItem]}>
                  <View style={[styles.transactionIcon, { backgroundColor: isCommission ? '#10B98115' : isWithdrawal ? '#3B82F615' : '#64748B15' }]}> 
                    <Icon size={20} color={isCommission ? '#10B981' : isWithdrawal ? '#3B82F6' : '#64748B'} />
                  </View>
                  <View style={[styles.transactionInfo, isRTL && styles.rtlTransactionInfo]}>
                    <View style={[styles.transactionHeader, isRTL && styles.rtlTransactionHeader]}>
                      <Text style={[styles.transactionDescription, isRTL && styles.rtlText]}>
                        {description}
                      </Text>
                      <Text style={[
                        styles.transactionAmount,
                        { color: isCommission ? '#10B981' : isWithdrawal ? '#EF4444' : '#64748B' },
                        isRTL && styles.rtlText
                      ]}>
                        {amount}
                        <Text style={styles.currency}> DT</Text>
                      </Text>
                    </View>
                    <View style={[styles.transactionFooter, isRTL && styles.rtlTransactionFooter]}>
                      <Text style={[styles.transactionDate, isRTL && styles.rtlText]}>
                        {tx.updated_at ? new Date(tx.updated_at).toLocaleDateString() : ''}
                      </Text>
                      <Text
                        style={[styles.transactionOrderId, isRTL && styles.rtlText, { flex: 1 }]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {tx.product_name || ''}
                      </Text>
                      <View style={[styles.statusBadge, { backgroundColor: isCommission ? '#10B98115' : isWithdrawal ? '#F59E0B15' : '#64748B15', marginLeft: 8, alignSelf: 'center' }]}> 
                        <Text style={[
                          styles.statusText,
                          { color: isCommission ? '#10B981' : isWithdrawal ? '#F59E0B' : '#64748B' },
                          isRTL && styles.rtlText
                        ]}>
                          {statusText}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Added padding to ensure content is not cut off by tab bar
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  nameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  bannerCard: {
    width: 280,
    height: 120,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  bannerImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bannerImageStyle: {
    borderRadius: 16,
  },
  bannerOverlay: {
    padding: 16,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginRight: '2%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    color: '#059669',
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  activityContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activityContent: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    color: '#0F172A',
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  activityAmount: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  // RTL styles
  rtlContainer: {
    writingDirection: 'rtl',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlWelcomeSection: {
    alignItems: 'flex-end',
  },
  rtlStatsGrid: {
    flexDirection: 'row-reverse',
  },
  rtlQuickActions: {
    flexDirection: 'row-reverse',
  },
  rtlActivityItem: {
    flexDirection: 'row-reverse',
  },
  rtlActivityContent: {
    alignItems: 'flex-end',
  },
  rtlStatChange: {
    flexDirection: 'row-reverse',
  },
  // New styles for transaction items
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  rtlTransactionItem: {
    flexDirection: 'row-reverse',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  rtlTransactionInfo: {
    alignItems: 'flex-end',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  rtlTransactionHeader: {
    flexDirection: 'row-reverse',
  },
  transactionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#0F172A',
    flex: 1,
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  transactionAmount: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  currency: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  rtlTransactionFooter: {
    flexDirection: 'row-reverse',
  },
  transactionDate: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  transactionOrderId: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
});

export default Dashboard;