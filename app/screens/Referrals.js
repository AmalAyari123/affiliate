import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Share2, Copy, Mail, MessageCircle, Facebook, Twitter, Instagram, Search, Filter, TrendingUp, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import AppHeader from '../components/AppHeader';

const Referrals = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const referralStats = [
    { title: t('referrals.totalReferrals'), value: '156', icon: Users, color: '#3B82F6' },
    { title: t('referrals.activeReferrals'), value: '89', icon: TrendingUp, color: '#10B981' },
    { title: t('common.pending'), value: '23', icon: Clock, color: '#F59E0B' },
    { title: t('common.completed'), value: '44', icon: CheckCircle, color: '#8B5CF6' },
  ];

  const referralData = [
    { name: 'John Smith', email: 'john@email.com', status: 'active', earnings: '$125.00', date: '2024-01-15', orders: 3 },
    { name: 'Sarah Johnson', email: 'sarah@email.com', status: 'pending', earnings: '$0.00', date: '2024-01-14', orders: 0 },
    { name: 'Mike Chen', email: 'mike@email.com', status: 'completed', earnings: '$245.50', date: '2024-01-13', orders: 5 },
    { name: 'Emma Davis', email: 'emma@email.com', status: 'active', earnings: '$78.00', date: '2024-01-12', orders: 2 },
    { name: 'David Wilson', email: 'david@email.com', status: 'completed', earnings: '$189.25', date: '2024-01-11', orders: 4 },
  ];

  const referralLink = "https://wamia.com/ref/WAMIA123";

  const shareReferralLink = async (platform) => {
    const message = t('referrals.joinWamia') + ` ${referralLink}`;
    
    if (platform) {
      Alert.alert(t('common.success'), t('referrals.shareSuccess', { platform }));
    } else {
      try {
        await Share.share({
          message: message,
          url: referralLink,
        });
      } catch (error) {
        Alert.alert(t('common.error'), 'Failed to share referral link');
      }
    }
  };

  const copyToClipboard = () => {
    Alert.alert(t('common.copied'), 'Referral link copied to clipboard');
  };

  const sendInvitation = (method) => {
    Alert.alert('Invitation', t('referrals.invitationSent', { method }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'completed': return '#8B5CF6';
      default: return '#64748B';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return TrendingUp;
      case 'pending': return Clock;
      case 'completed': return CheckCircle;
      default: return Users;
    }
  };

  const filteredReferrals = referralData.filter(referral => {
    const matchesSearch = referral.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         referral.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || referral.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtlContainer]} edges={['top']}>
      <AppHeader 
        title={t('navigation.referrals')}
        variant="gradient"
        showLogo={true}
        showActions={true}
      />
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Referral Link Card */}
        <View style={styles.referralCard}>
          <LinearGradient
            colors={['#3B82F6', '#8B5CF6']}
            style={styles.referralGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.referralTitle, isRTL && styles.rtlText]}>{t('referrals.yourReferralLink')}</Text>
            <View style={[styles.linkContainer, isRTL && styles.rtlLinkContainer]}>
              <Text style={[styles.linkText, isRTL && styles.rtlText]} numberOfLines={1}>{referralLink}</Text>
              <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                <Copy size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={[styles.shareButtons, isRTL && styles.rtlShareButtons]}>
              <TouchableOpacity style={styles.shareButton} onPress={() => shareReferralLink()}>
                <Share2 size={16} color="#FFFFFF" />
                <Text style={[styles.shareButtonText, isRTL && styles.rtlText]}>{t('common.share')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton} onPress={() => sendInvitation('Email')}>
                <Mail size={16} color="#FFFFFF" />
                <Text style={[styles.shareButtonText, isRTL && styles.rtlText]}>{t('referrals.email')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton} onPress={() => sendInvitation('SMS')}>
                <MessageCircle size={16} color="#FFFFFF" />
                <Text style={[styles.shareButtonText, isRTL && styles.rtlText]}>{t('referrals.sms')}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Social Share Options */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('referrals.shareOnSocialMedia')}</Text>
        <View style={[styles.socialButtons, isRTL && styles.rtlSocialButtons]}>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1877F2' }]} onPress={() => shareReferralLink('Facebook')}>
            <Facebook size={24} color="#FFFFFF" />
            <Text style={[styles.socialButtonText, isRTL && styles.rtlText]}>{t('referrals.facebook')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]} onPress={() => shareReferralLink('Twitter')}>
            <Twitter size={24} color="#FFFFFF" />
            <Text style={[styles.socialButtonText, isRTL && styles.rtlText]}>{t('referrals.twitter')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#E4405F' }]} onPress={() => shareReferralLink('Instagram')}>
            <Instagram size={24} color="#FFFFFF" />
            <Text style={[styles.socialButtonText, isRTL && styles.rtlText]}>{t('referrals.instagram')}</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={[styles.statsContainer, isRTL && styles.rtlStatsContainer]}>
          {referralStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <Text style={[styles.statValue, isRTL && styles.rtlText]}>{stat.value}</Text>
              <Text style={[styles.statTitle, isRTL && styles.rtlText]}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* Search and Filter */}
        <View style={[styles.searchContainer, isRTL && styles.rtlSearchContainer]}>
          <View style={[styles.searchInputContainer, isRTL && styles.rtlSearchInputContainer]}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={[styles.searchInput, isRTL && styles.rtlSearchInput]}
              placeholder={t('referrals.searchReferrals')}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
          {['all', 'active', 'pending', 'completed'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterTab, selectedFilter === filter && styles.activeFilterTab]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterTabText, selectedFilter === filter && styles.activeFilterTabText, isRTL && styles.rtlText]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Referral List */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('referrals.yourReferrals')}</Text>
        <View style={styles.referralList}>
          {filteredReferrals.map((referral, index) => {
            const StatusIcon = getStatusIcon(referral.status);
            return (
              <TouchableOpacity key={index} style={[styles.referralItem, isRTL && styles.rtlReferralItem]}>
                <View style={[styles.referralInfo, isRTL && styles.rtlReferralInfo]}>
                  <View style={[styles.referralHeader, isRTL && styles.rtlReferralHeader]}>
                    <Text style={[styles.referralName, isRTL && styles.rtlText]}>{referral.name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(referral.status)}15` }]}>
                      <StatusIcon size={12} color={getStatusColor(referral.status)} />
                      <Text style={[styles.statusText, { color: getStatusColor(referral.status) }, isRTL && styles.rtlText]}>
                        {referral.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.referralEmail, isRTL && styles.rtlText]}>{referral.email}</Text>
                  <View style={[styles.referralStats, isRTL && styles.rtlReferralStats]}>
                    <Text style={[styles.referralStat, isRTL && styles.rtlText]}>{t('referrals.orders')}: {referral.orders}</Text>
                    <Text style={[styles.referralStat, isRTL && styles.rtlText]}>•</Text>
                    <Text style={[styles.referralStat, isRTL && styles.rtlText]}>{t('referrals.joined')}: {referral.date}</Text>
                  </View>
                </View>
                <View style={[styles.referralEarnings, isRTL && styles.rtlReferralEarnings]}>
                  <Text style={[styles.earningsAmount, isRTL && styles.rtlText]}>{referral.earnings}</Text>
                  <Text style={[styles.earningsLabel, isRTL && styles.rtlText]}>{t('campaigns.earned')}</Text>
                </View>
              </TouchableOpacity>
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
  referralCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  referralGradient: {
    padding: 20,
  },
  referralTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  linkText: {
    flex: 1,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  copyButton: {
    padding: 4,
    marginLeft: 8,
  },
  shareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  socialButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#0F172A',
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  filterTabs: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  activeFilterTab: {
    backgroundColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Medium',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  referralList: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  referralItem: {
    flexDirection: 'row',
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
  referralInfo: {
    flex: 1,
  },
  referralHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  referralName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  referralEmail: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  referralStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referralStat: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginRight: 8,
  },
  referralEarnings: {
    alignItems: 'flex-end',
  },
  earningsAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
    fontFamily: 'Inter-Bold',
  },
  earningsLabel: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  // RTL styles
  rtlContainer: {
    writingDirection: 'rtl',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlLinkContainer: {
    flexDirection: 'row-reverse',
  },
  rtlShareButtons: {
    flexDirection: 'row-reverse',
  },
  rtlSocialButtons: {
    flexDirection: 'row-reverse',
  },
  rtlStatsContainer: {
    flexDirection: 'row-reverse',
  },
  rtlSearchContainer: {
    flexDirection: 'row-reverse',
  },
  rtlSearchInputContainer: {
    flexDirection: 'row-reverse',
  },
  rtlSearchInput: {
    textAlign: 'right',
  },
  rtlReferralItem: {
    flexDirection: 'row-reverse',
  },
  rtlReferralInfo: {
    alignItems: 'flex-end',
  },
  rtlReferralHeader: {
    flexDirection: 'row-reverse',
  },
  rtlReferralStats: {
    flexDirection: 'row-reverse',
  },
  rtlReferralEarnings: {
    alignItems: 'flex-start',
  },

});

export default Referrals;
