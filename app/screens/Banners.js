// app/screens/Banners.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Clipboard,
  RefreshControl
} from 'react-native';
import he from 'he';
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BannersContext from '../context/BannersContext';
import CampaignsContext from '../context/CampaignsContext';
import Screen from '../components/Screen';

const IMAGE_BASE_URL = 'https://dev.wamia.tn';

// Utility to extract all image URLs from HTML content
function extractImageUrls(html) {
  if (!html) return [];

  console.log('Processing banner content:', html);

  // Step 1: Decode HTML entities (twice for robustness)
  const decodedContent = he.decode(he.decode(html));
  console.log('Decoded content:', decodedContent);

  const urls = [];

  // Step 2: Try multiple regex patterns to match different formats
  const patterns = [
    /\{\{\s*media\s+url\s*=\s*"([^"]+)"\s*\}\}/gi,  // {{media url="path"}}
    /\{\{\s*media\s+url\s*=\s*'([^']+)'\s*\}\}/gi,  // {{media url='path'}}
    /<img[^>]+src\s*=\s*"\{\{\s*media\s+url\s*=\s*"([^"]+)"\s*\}\}"[^>]*>/gi, // <img src="{{media url="path"}}">
    /<img[^>]+src\s*=\s*"([^"]*\/media\/[^"]+)"[^>]*>/gi, // <img src="direct/media/path">
    /src\s*=\s*"([^"]*\/media\/[^"]+)"/gi, // any src="path/media/file"
  ];

  patterns.forEach((regex, index) => {
    let matches;
    regex.lastIndex = 0; // Reset regex
    
    while ((matches = regex.exec(decodedContent))) {
      const relativePath = matches[1];
      console.log(`Pattern ${index + 1} matched:`, relativePath);
      
      let fullUrl;
      if (relativePath.startsWith('http')) {
        // Already a full URL
        fullUrl = relativePath;
      } else if (relativePath.startsWith('/media/')) {
        // Starts with /media/
        fullUrl = `https://dev.wamia.tn${relativePath}`;
      } else {
        // Relative path
        fullUrl = `https://dev.wamia.tn/media/${relativePath}`;
      }
      
      console.log('Generated URL:', fullUrl);
      if (!urls.includes(fullUrl)) {
        urls.push(fullUrl);
      }
    }
  });

  console.log('Final extracted URLs:', urls);
  return urls;
}

const Banners = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedBannerCode, setSelectedBannerCode] = useState('');
  const [modalType, setModalType] = useState('code'); // 'code' or 'link'
  const navigation = useNavigation();
  const { banners, loading, error, loadBanners } = useContext(BannersContext);
  useFocusEffect(
    React.useCallback(() => {
      loadBanners && loadBanners();
    }, [])
  );
  const { campaigns } = useContext(CampaignsContext);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBanners();
    setRefreshing(false);
  };

  const bannerStats = [
    { title: t('banners.totalBanners'), value: '12', icon: ImageIcon, color: '#3B82F6' },
    { title: t('banners.totalImpressions'), value: '45.2K', icon: Eye, color: '#10B981' },
    { title: 'Clicks', value: '2,456', icon: Click, color: '#8B5CF6' },
    { title: 'Earnings', value: '5.4%', icon: TrendingUp, color: '#F59E0B' },
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
    setModalType('code');
    setShowCodeModal(true);
  }

  function copyBannerLink(link) {
    Clipboard.setString(link);
    Alert.alert(t('common.copied'), t('banners.copyLink'));
  }

  function copyToClipboard(text) {
    Clipboard.setString(text);  // Use Clipboard API to copy the string
    Alert.alert(t('common.copied'), modalType === 'code' ? t('banners.copyCode') : t('banners.copyLink'));  // Display a confirmation message
    setShowCodeModal(false);  // Close the modal after copying
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
    <Screen style={[styles.container, isRTL && styles.rtlContainer]}>
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {/* Banner Stats */}
        <View style={[styles.statsContainer, isRTL && styles.rtlStatsContainer]}>
          <View style={[styles.statsRow, isRTL && styles.rtlStatsRow]}>
            {bannerStats.slice(0, 2).map((stat, i) => (
              <View key={i} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <stat.icon size={20} color={stat.color} />
                </View>
                <Text style={[styles.statValue, isRTL && styles.rtlText]}>{stat.value}</Text>
                <Text style={[styles.statTitle, isRTL && styles.rtlText]}>{stat.title}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.statsRow, isRTL && styles.rtlStatsRow]}>
            {bannerStats.slice(2, 4).map((stat, i) => (
              <View key={i + 2} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <stat.icon size={20} color={stat.color} />
                </View>
                <Text style={[styles.statValue, isRTL && styles.rtlText]}>{stat.value}</Text>
                <Text style={[styles.statTitle, isRTL && styles.rtlText]}>{stat.title}</Text>
              </View>
            ))}
          </View>
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
        {loading && <Text style={{ textAlign: 'center' }}>{t('common.loading')}</Text>}
        {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
        {banners.map((banner, idx) => {
          const images = extractImageUrls(banner.content);
          const imageUrl = images[0];
          const campaign = campaigns.find(c => c.campaign_id === banner.campaign_id);
          
          console.log('Banner:', banner.title, 'Image URL:', imageUrl);
          
          return (
            <TouchableOpacity
              key={banner.banner_id}
              style={styles.bannerCard}
              onPress={() => navigation.navigate('BannerDetails', { banner })}
            >
              {imageUrl ? (
                <Image 
                  source={{ uri: imageUrl }} 
                  style={styles.bannerImage}
                  onError={(error) => console.log('Image load error:', error)}
                  onLoad={() => console.log('Image loaded successfully:', imageUrl)}
                />
              ) : (
                <View style={[styles.bannerImage, styles.placeholderImage]}>
                  <ImageIcon size={32} color="#CBD5E1" />
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}
              <View style={styles.bannerContent}>
                <View style={[styles.bannerHeader, isRTL && styles.rtlBannerHeader]}>
                  <View style={[styles.bannerInfo, isRTL && styles.rtlBannerInfo]}>
                    <Text style={[styles.bannerName, isRTL && styles.rtlText]}>
                      {banner.title}
                    </Text>
                    <Text style={[styles.bannerCampaign, isRTL && styles.rtlText]}>
                      {campaign ? campaign.name : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: `${getStatusColor(banner.status === 1 ? 'active' : 'expired')}15` },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(banner.status === 1 ? 'active' : 'expired') },
                        isRTL && styles.rtlText,
                      ]}
                    >
                      {banner.status === 1 ? 'active' : t('banners.expired')}
                    </Text>
                  </View>
                </View>

                <View style={[styles.bannerMetrics, isRTL && styles.rtlBannerMetrics]}>
                  <View style={styles.metric}>
                    <Text style={[styles.metricValue, isRTL && styles.rtlText]}>
                      {(banner.impressions ?? 0).toLocaleString()}
                    </Text>
                    <Text style={[styles.metricLabel, isRTL && styles.rtlText]}>
                      {t('banners.impressions')}
                    </Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={[styles.metricValue, isRTL && styles.rtlText]}>
                      {(banner.clicks ?? 0).toLocaleString()}
                    </Text>
                    <Text style={[styles.metricLabel, isRTL && styles.rtlText]}>
                      clicks
                    </Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={[styles.metricValue, isRTL && styles.rtlText]}>
                      {(banner.ctr ?? 0).toLocaleString()}
                    </Text>
                    <Text style={[styles.metricLabel, isRTL && styles.rtlText]}>
                      {t('banners.ctr')}
                    </Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={[styles.metricValue, isRTL && styles.rtlText]}>
                      {(banner.earnings ?? 0).toLocaleString()}
                    </Text>
                    <Text style={[styles.metricLabel, isRTL && styles.rtlText]}>
                      earnings
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
                    onPress={() => copyBannerLink(banner.link || banner.banner_link || banner.directLink)}
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
                    onPress={() => viewBannerAnalytics(banner.banner_id)}
                  >
                    <BarChart3 size={16} color="#F59E0B" />
                    <Text style={[styles.actionButtonText, isRTL && styles.rtlText]}>
                      {t('banners.analytics')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Code/Link Modal */}
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
                  {modalType === 'code' ? t('banners.bannerCode') : t('banners.bannerLink')}
                </Text>
                <TouchableOpacity onPress={() => setShowCodeModal(false)}>
                  <X size={24} color="#64748B" />
                </TouchableOpacity>
              </View>
              <View style={styles.modalBody}>
                <Text style={[styles.modalLabel, isRTL && styles.rtlText]}>
                  {modalType === 'code' ? t('banners.copyCode') : t('banners.copyLink')}
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
                    {modalType === 'code' ? t('banners.copyCode') : t('banners.copyLink')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Screen>
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
    paddingHorizontal: 20,
    marginBottom: 32,
    marginTop: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12,
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
  placeholderImage: {
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
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
    // RTL support for 2x2 grid layout
  },
  rtlStatsRow: {
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
