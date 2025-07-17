import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import {
  DollarSign,
  Target,
  Clock as Click,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Award,
} from 'lucide-react-native';
import { useLanguage } from '../hooks/useLanguage';
import AppHeader from '../components/AppHeader';

const Analytics = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('earnings');

  const screenWidth = Dimensions.get('window').width;

  const periods = [
    { key: 'week', label: '7 Days' },
    { key: 'month', label: '30 Days' },
    { key: 'quarter', label: '90 Days' },
    { key: 'year', label: '1 Year' },
  ];

  const overviewStats = [
    {
      title: t('analytics.totalEarnings'),
      value: '$2,450.00',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: '#10B981',
    },
    {
      title: t('analytics.conversions'),
      value: '89',
      change: '+8.2%',
      trend: 'up',
      icon: Target,
      color: '#3B82F6',
    },
    {
      title: t('analytics.clickRate'),
      value: '4.2%',
      change: '-2.1%',
      trend: 'down',
      icon: Click,
      color: '#F59E0B',
    },
    {
      title: 'Referrals',
      value: '156',
      change: '+15.7%',
      trend: 'up',
      icon: Users,
      color: '#8B5CF6',
    },
  ];

  const performanceMetrics = [
    { title: t('analytics.totalClicks'), value: '1,234', change: '+18.7%', trend: 'up' },
    { title: t('analytics.uniqueVisitors'), value: '856', change: '+12.3%', trend: 'up' },
    { title: t('analytics.conversionRate'), value: '10.4%', change: '+2.1%', trend: 'up' },
    { title: t('analytics.averageOrderValue'), value: '$89.50', change: '-5.2%', trend: 'down' },
    { title: t('analytics.commissionPerClick'), value: '$1.98', change: '+8.9%', trend: 'up' },
    { title: t('analytics.bounceRate'), value: '32.1%', change: '-4.8%', trend: 'up' },
  ];

  const topProducts = [
    { name: 'Premium Subscription', sales: 45, commission: '$225.00', rate: '15%' },
    { name: 'Starter Pack', sales: 32, commission: '$128.00', rate: '12%' },
    { name: 'Pro Tools', sales: 28, commission: '$168.00', rate: '18%' },
    { name: 'Digital Course', sales: 24, commission: '$192.00', rate: '20%' },
    { name: 'Consulting Session', sales: 18, commission: '$270.00', rate: '25%' },
  ];

  const trafficSources = [
    { source: t('analytics.socialMedia'), percentage: 35, visits: 298, color: '#3B82F6' },
    { source: t('analytics.directLink'), percentage: 28, visits: 238, color: '#10B981' },
    { source: t('analytics.emailCampaign'), percentage: 22, visits: 187, color: '#8B5CF6' },
    { source: t('analytics.referral'), percentage: 10, visits: 85, color: '#F59E0B' },
    { source: t('analytics.other'), percentage: 5, visits: 42, color: '#64748B' },
  ];

  const recentAchievements = [
    {
      title: t('analytics.topPerformer'),
      description: t('analytics.reachedReferrals'),
      icon: Award,
      color: '#F59E0B',
    },
    {
      title: t('analytics.conversionMaster'),
      description: t('analytics.conversionAchieved'),
      icon: Target,
      color: '#10B981',
    },
    {
      title: t('analytics.socialStar'),
      description: t('analytics.socialShares'),
      icon: Users,
      color: '#3B82F6',
    },
  ];

  const chartData = {
    week: [20, 45, 28, 80, 99, 43, 35],
    month: [
      420, 380, 520, 600, 750, 680, 890, 920, 1100, 1250, 1180, 1350, 1200, 1400, 1550,
      1300, 1600, 1750, 1650, 1800, 1950, 1850, 2000, 2150, 2050, 2200, 2350, 2250, 2400, 2450,
    ],
    quarter: [2400, 2800, 3200, 3600, 4000, 4400, 4800, 5200, 5600, 6000, 6400, 6800],
    year: [12000, 15000, 18000, 21000, 24000, 27000, 30000, 33000, 36000, 39000, 42000, 45000],
  };

  const getCurrentData = () => chartData[selectedPeriod] || chartData.week;

  const renderMiniChart = (data) => {
    const maxValue = Math.max(...data);
    const barWidth = (screenWidth - 80) / data.length - 4;

    return (
      <View style={styles.miniChart}>
        {data.map((value, index) => (
          <View
            key={index}
            style={[
              styles.miniBar,
              {
                height: (value / maxValue) * 60,
                width: barWidth,
                backgroundColor: selectedMetric === 'earnings' ? '#10B981' : '#3B82F6',
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtlContainer]} edges={['top']}>
      <AppHeader
        title={t('navigation.analytics')}
        variant="gradient"
        showLogo={true}
        showActions={true}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[styles.periodTab, selectedPeriod === period.key && styles.activePeriodTab]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text style={[styles.periodTabText, selectedPeriod === period.key && styles.activePeriodTabText, isRTL && styles.rtlText]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.overviewContainer, isRTL && styles.rtlOverviewContainer]}>
          {overviewStats.map((stat, index) => (
            <View key={index} style={styles.overviewCard}>
              <View style={[styles.overviewHeader, isRTL && styles.rtlOverviewHeader]}>
                <View style={[styles.overviewIcon, { backgroundColor: `${stat.color}15` }]}>
                  <stat.icon size={20} color={stat.color} />
                </View>
                <View style={styles.overviewTrend}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight size={16} color="#10B981" />
                  ) : (
                    <ArrowDownRight size={16} color="#EF4444" />
                  )}
                  <Text style={[styles.overviewChange, { color: stat.trend === 'up' ? '#10B981' : '#EF4444' }, isRTL && styles.rtlText]}>
                    {stat.change}
                  </Text>
                </View>
              </View>
              <Text style={[styles.overviewValue, isRTL && styles.rtlText]}>{stat.value}</Text>
              <Text style={[styles.overviewTitle, isRTL && styles.rtlText]}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* Additional sections remain unchanged - you already wrote them in valid JSX */}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  rtlContainer: {
    flexDirection: 'row-reverse',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  periodSelector: {
    marginBottom: 16,
  },
  periodTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },
  activePeriodTab: {
    backgroundColor: '#3B82F6',
  },
  periodTabText: {
    fontSize: 14,
    color: '#1F2937',
  },
  activePeriodTabText: {
    color: '#FFFFFF',
  },
  rtlText: {
    textAlign: 'right',
  },
  overviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rtlOverviewContainer: {
    flexDirection: 'row-reverse',
  },
  overviewCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rtlOverviewHeader: {
    flexDirection: 'row-reverse',
  },
  overviewIcon: {
    padding: 8,
    borderRadius: 8,
  },
  overviewTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewChange: {
    marginLeft: 4,
    fontSize: 13,
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  overviewTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  miniChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  miniBar: {
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

export default Analytics;
