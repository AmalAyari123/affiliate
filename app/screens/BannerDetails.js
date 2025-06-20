import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Share2, Copy, Eye, TrendingUp, ChartBar as BarChart3, Calendar, Download, Code, Link, X } from 'lucide-react-native';

const BannerDetails = () => {
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedCodeType, setSelectedCodeType] = useState('html');

  const banner = {
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
    htmlCode: '<a href="https://wamia.com/summer-sale?ref=WAMIA123" target="_blank"><img src="https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=728&h=90" alt="Summer Sale - Get 25% Off" style="border:0;" /></a>',
    directLink: 'https://wamia.com/summer-sale?ref=WAMIA123',
    performanceData: [
      { date: '2024-06-01', impressions: 450, clicks: 24, conversions: 2 },
      { date: '2024-06-02', impressions: 520, clicks: 28, conversions: 3 },
      { date: '2024-06-03', impressions: 380, clicks: 19, conversions: 1 },
      { date: '2024-06-04', impressions: 610, clicks: 35, conversions: 4 },
      { date: '2024-06-05', impressions: 490, clicks: 26, conversions: 2 },
      { date: '2024-06-06', impressions: 720, clicks: 42, conversions: 5 },
      { date: '2024-06-07', impressions: 580, clicks: 31, conversions: 3 }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'paused': return '#F59E0B';
      case 'expired': return '#EF4444';
      default: return '#64748B';
    }
  };

  const copyCode = (code) => {
    Alert.alert('Copied!', 'Code copied to clipboard');
    setShowCodeModal(false);
  };

  const shareBanner = () => {
    Alert.alert('Share Banner', 'Opening share options...');
  };

  const downloadBanner = () => {
    Alert.alert('Download', 'Banner image will be downloaded');
  };

  const showCode = (type) => {
    setSelectedCodeType(type);
    setShowCodeModal(true);
  };

  const getCodeContent = () => {
    switch (selectedCodeType) {
      case 'html':
        return banner.htmlCode;
      case 'link':
        return banner.directLink;
      case 'markdown':
        return `[![${banner.name}](${banner.image})](${banner.directLink})`;
      default:
        return banner.htmlCode;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Banner Details</Text>
          <TouchableOpacity style={styles.shareButton} onPress={shareBanner}>
            <Share2 size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Content Sections (Preview, Info, Stats, Chart, Code Options, Actions, Modal) */}
        {/* ...the rest of your JSX structure remains unchanged... */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollView: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2
  },
  headerTitle: {
    fontSize: 18, fontWeight: '700', color: '#0F172A', fontFamily: 'Inter-Bold'
  },
  shareButton: {
    backgroundColor: '#3B82F6', borderRadius: 20, width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center'
  },
});

export default BannerDetails;
