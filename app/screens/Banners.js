// app/screens/Banners.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Image as ImageIcon,
  Eye,
  Copy,
  Share2,
  Download,
  ChartBar as BarChart3,
  TrendingUp,
  MousePointer as Click,
  Calendar,
  X,
  Code,
  Link,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import AppHeader from '../components/AppHeader';

const Banners = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedBannerCode, setSelectedBannerCode] = useState('');

  const bannerStats = [
    { title: t('banners.totalBanners'), value: '12', icon: ImageIcon, color: '#3B82F6' },
    { title: t('banners.totalImpressions'), value: '45.2K', icon: Eye, color: '#10B981' },
    { title: t('banners.totalClicks'), value: '2,456', icon: Click, color: '#8B5CF6' },
    { title: t('banners.clickRate'), value: '5.4%', icon: TrendingUp, color: '#F59E0B' },
  ];

  const bannerData = [
    {
      id: '1',
      name: 'Summer Sale Hero Banner',
      campaign: 'Summer Sale 2024',
      image: 'https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=800',
      size: '728x90',
      type: 'Leaderboard',
      impressions: 12450,
      clicks: 678,
      ctr: '5.4%',
      conversions: 34,
      earnings: '$245.50',
      status: 'active',
      createdDate: '2024-06-01',
      htmlCode:
        '<a href="https://wamia.com/summer-sale?ref=WAMIA123"><img src="https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg" alt="Summer Sale" /></a>',
      directLink: 'https://wamia.com/summer-sale?ref=WAMIA123',
    },
    // … other banners …
  ];

  function getStatusColor(status) {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'scheduled':
        return '#F59E0B';
      case 'paused':
        return '#64748B';
      case 'expired':
        return '#EF4444';
      default:
        return '#64748B';
    }
  }

  function copyBannerCode(code) {
    setSelectedBannerCode(code);
    setShowCodeModal(true);
  }

  function copyToClipboard(text) {
    Alert.alert(t('common.copied'), t('banners.copyCode'));
    setShowCodeModal(false);
  }

  function shareBanner(banner) {
    Alert.alert('Share Banner', `Sharing ${banner.name} banner`);
  }

  function downloadBanner(banner) {
    Alert.alert('Download', `Downloading ${banner.name} banner`);
  }

  function viewBannerAnalytics(bannerId) {
    Alert.alert(t('banners.analytics'), `Viewing analytics for banner ${bannerId}`);
  }

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtlContainer]}>
      <AppHeader
        title={t('navigation.banners')}
        variant="gradient"
        showLogo
        showActions
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Stats */}
        <View style={[styles.statsContainer, isRTL && styles.rtlStatsContainer]}>
          {bannerStats.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <Text style={[styles.statValue, isRTL && styles.rtlText]}>{stat.value}</Text>
              <Text style={[styles.statTitle, isRTL && styles.rtlText]}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* Performance Chart */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
          {t('banners.performanceOverview')}
        </Text>
        <View style={styles.chartCard}>
          <View style={[styles.chartHeader, isRTL && styles.rtlChartHeader]}>
            <Text style={[styles.chartTitle, isRTL && styles.rtlText]}>
              {t('banners.bannerPerformance')}
            </Text>
            <TouchableOpacity style={styles.chartButton}>
              <BarChart3 size={16} color="#64748B" />
              <Text style={[styles.chartButtonText, isRTL && styles.rtlText]}>
                {t('banners.viewDetails')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartPlaceholder}>
            <BarChart3 size={48} color="#CBD5E1" />
            <Text style={[styles.chartPlaceholderText, isRTL && styles.rtlText]}>
              Performance chart will be displayed here
            </Text>
          </View>
        </View>

        {/* Banner List */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
          {t('banners.yourBanners')}
        </Text>
        {bannerData.map((banner, idx) => (
          <View key={idx} style={styles.bannerCard}>
            <Image source={{ uri: banner.image }} style={styles.bannerImage} />
            <View style={styles.bannerContent}>
              <View style={[styles.bannerHeader, isRTL && styles.rtlBannerHeader]}>
                <View style={[styles.bannerInfo, isRTL && styles.rtlBannerInfo]}>
                  <Text style={[styles.bannerName, isRTL && styles.rtlText]}>
                    {banner.name}
                  </Text>
                  <Text style={[styles.bannerCampaign, isRTL && styles.rtlText]}>
                    {banner.campaign}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: `${getStatusColor(banner.status)}15` },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(banner.status) },
                      isRTL && styles.rtlText,
                    ]}
                  >
                    {banner.status}
                  </Text>
                </View>
              </View>

              <View style={[styles.bannerMetrics, isRTL && styles.rtlBannerMetrics]}>
                <View style={styles.metric}>
                  <Text style={[styles.metricValue, isRTL && styles.rtlText]}>
                    {banner.impressions.toLocaleString()}
                  </Text>
                  <Text style={[styles.metricLabel, isRTL && styles.rtlText]}>
                    {t('banners.impressions')}
                  </Text>
                </View>
                <View style={styles.metric}>
                  <Text style={[styles.metricValue, isRTL && styles.rtlText]}>
                    {banner.clicks}
                  </Text>
                  <Text style={[styles.metricLabel, isRTL && styles.rtlText]}>
                    {t('banners.clicks')}
                  </Text>
                </View>
                <View style={styles.metric}>
                  <Text style={[styles.metricValue, isRTL && styles.rtlText]}>
                    {banner.ctr}
                  </Text>
                  <Text style={[styles.metricLabel, isRTL && styles.rtlText]}>
                    {t('banners.ctr')}
                  </Text>
                </View>
                <View style={styles.metric}>
                  <Text style={[styles.metricValue, isRTL && styles.rtlText]}>
                    {banner.earnings}
                  </Text>
                  <Text style={[styles.metricLabel, isRTL && styles.rtlText]}>
                    {t('banners.earnings')}
                  </Text>
                </View>
              </View>

              <View style={[styles.bannerActions, isRTL && styles.rtlBannerActions]}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => copyBannerCode(banner.htmlCode)}
                >
                  <Code size={16} color="#3B82F6" />
                  <Text style={[styles.actionButtonText, isRTL && styles.rtlText]}>
                    {t('banners.getCode')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => copyBannerCode(banner.directLink)}
                >
                  <Link size={16} color="#10B981" />
                  <Text style={[styles.actionButtonText, isRTL && styles.rtlText]}>
                    {t('banners.getLink')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => shareBanner(banner)}
                >
                  <Share2 size={16} color="#8B5CF6" />
                  <Text style={[styles.actionButtonText, isRTL && styles.rtlText]}>
                    {t('common.share')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => viewBannerAnalytics(banner.id)}
                >
                  <BarChart3 size={16} color="#F59E0B" />
                  <Text style={[styles.actionButtonText, isRTL && styles.rtlText]}>
                    {t('banners.analytics')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Code Modal */}
        <Modal
          visible={showCodeModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCodeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, isRTL && styles.rtlModal]}>
              <View style={[styles.modalHeader, isRTL && styles.rtlModalHeader]}>
                <Text style={[styles.modalTitle, isRTL && styles.rtlText]}>
                  {t('banners.bannerCode')}
                </Text>
                <TouchableOpacity onPress={() => setShowCodeModal(false)}>
                  <X size={24} color="#64748B" />
                </TouchableOpacity>
              </View>
              <View style={styles.modalBody}>
                <Text style={[styles.modalLabel, isRTL && styles.rtlText]}>
                  {t('banners.copyCode')}
                </Text>
                <ScrollView style={styles.codeContainer}>
                  <Text style={[styles.codeText, isRTL && styles.rtlText]}>
                    {selectedBannerCode}
                  </Text>
                </ScrollView>
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(selectedBannerCode)}
                >
                  <Copy size={16} color="#FFF" />
                  <Text style={[styles.copyButtonText, isRTL && styles.rtlText]}>
                    {t('banners.copyCode')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    marginTop: 16,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
  },
  chartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chartButtonText: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#94A3B8',
    fontFamily: 'Inter-Regular',
    marginTop: 8,
  },
  bannersList: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  bannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
  bannerContent: {
    padding: 16,
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bannerInfo: {
    flex: 1,
  },
  bannerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  bannerCampaign: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
  },
  bannerDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  bannerDetail: {
    marginRight: 24,
  },
  bannerDetailLabel: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  bannerDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
  },
  bannerMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  bannerActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
    color: '#64748B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
  },
  modalBody: {
    padding: 20,
  },
  modalLabel: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  codeContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 200,
  },
  codeScrollView: {
    padding: 12,
  },
  codeText: {
    fontSize: 12,
    color: '#0F172A',
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 12,
  },
  copyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  // RTL styles
  rtlContainer: {
    writingDirection: 'rtl',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlStatsContainer: {
    flexDirection: 'row-reverse',
  },
  rtlChartHeader: {
    flexDirection: 'row-reverse',
  },
  rtlBannerHeader: {
    flexDirection: 'row-reverse',
  },
  rtlBannerInfo: {
    alignItems: 'flex-end',
  },
  rtlBannerDetails: {
    flexDirection: 'row-reverse',
  },
  rtlBannerMetrics: {
    flexDirection: 'row-reverse',
  },
  rtlBannerActions: {
    flexDirection: 'row-reverse',
  },
  rtlModal: {
    // Removed invalid 'direction: rtl' property
  },
  rtlModalHeader: {
    flexDirection: 'row-reverse',
  },
});

export default Banners;
