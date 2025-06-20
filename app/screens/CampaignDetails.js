import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Share2, Copy, Eye, TrendingUp, DollarSign, Calendar, Users, Target, Gift, Clock, CircleCheck as CheckCircle, Star } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';


const CampaignDetails = () => {
  
    const navigation = useNavigation();

  // Mock campaign data - in real app, fetch based on ID
  const campaign = {
    id: '1',
    name: 'Wamia Summer Sale 2024',
    description: 'Get 25% extra commission on all summer products including fashion, accessories, and lifestyle items. This exclusive campaign runs throughout the summer season with special bonuses for top performers.',
    image: 'https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=800',
    commission: '20%',
    discount: '15%',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    status: 'active',
    clicks: 456,
    conversions: 23,
    earnings: '$345.50',
    tier: 'Gold',
    priority: 1,
    categories: ['Fashion', 'Accessories', 'Lifestyle'],
    referralLink: 'https://customer.wamia.tn/summer-sale?ref=WAMIA123',
    terms: [
      'Commission applies to all qualifying products in selected categories',
      'Minimum order value of $50 required',
      'Commission paid within 30 days of order completion',
      'Refunded orders will have commission deducted',
      'Maximum 5 orders per customer per month'
    ],
    banners: [
      {
        id: '1',
        name: 'Hero Banner',
        size: '728x90',
        image: 'https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=800',
        clicks: 234,
        impressions: 5670
      },
      {
        id: '2',
        name: 'Square Banner',
        size: '300x300',
        image: 'https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=800',
        clicks: 156,
        impressions: 3450
      }
    ],
    topProducts: [
      { name: 'Summer Dress Collection', sales: 45, commission: '$89.50' },
      { name: 'Beach Accessories Set', sales: 32, commission: '$64.00' },
      { name: 'Sunglasses Premium', sales: 28, commission: '$56.75' }
    ]
  };

  const copyReferralLink = () => {
    Alert.alert('Copied!', 'Referral link copied to clipboard');
  };

  const shareCampaign = () => {
    Alert.alert('Share Campaign', 'Opening share options...');
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Bronze': return '#CD7F32';
      case 'Silver': return '#C0C0C0';
      case 'Gold': return '#FFD700';
      case 'Platinum': return '#E5E4E2';
      default: return '#64748B';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <LinearGradient
              colors={['#FF6B35', '#F59E0B']}
              style={styles.logoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.logoText}>wamia</Text>
            </LinearGradient>
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={shareCampaign}>
            <Share2 size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Campaign Hero */}
        <View style={styles.heroSection}>
          <Image source={{ uri: campaign.image }} style={styles.heroImage} />
          <LinearGradient
            colors={['rgba(255, 107, 53, 0.7)', 'rgba(30, 64, 175, 0.7)']}
            style={styles.heroOverlay}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroHeader}>
                <Text style={styles.heroTitle}>{campaign.name}</Text>
                <View style={[styles.tierBadge, { backgroundColor: getTierColor(campaign.tier) }]}>
                  <Star size={16} color="#000000" />
                  <Text style={styles.tierText}>{campaign.tier}</Text>
                </View>
              </View>
              <Text style={styles.heroDescription}>{campaign.description}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Campaign Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <DollarSign size={24} color="#059669" />
            <Text style={styles.statValue}>{campaign.commission}</Text>
            <Text style={styles.statLabel}>Commission</Text>
          </View>
          <View style={styles.statCard}>
            <Gift size={24} color="#7C3AED" />
            <Text style={styles.statValue}>{campaign.discount}</Text>
            <Text style={styles.statLabel}>Discount</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#FF6B35" />
            <Text style={styles.statValue}>{campaign.conversions}</Text>
            <Text style={styles.statLabel}>Conversions</Text>
          </View>
          <View style={styles.statCard}>
            <Eye size={24} color="#1E40AF" />
            <Text style={styles.statValue}>{campaign.clicks}</Text>
            <Text style={styles.statLabel}>Clicks</Text>
          </View>
        </View>

        {/* Referral Link */}
        <View style={styles.linkSection}>
          <Text style={styles.sectionTitle}>Your Referral Link</Text>
          <View style={styles.linkCard}>
            <Text style={styles.linkText} numberOfLines={1}>{campaign.referralLink}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyReferralLink}>
              <Copy size={18} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ...rest of your sections remain unchanged... */}

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  logoGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
  shareButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'flex-end',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    flex: 1,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  tierText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  heroDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    opacity: 0.9,
    lineHeight: 20,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
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
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  linkSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  copyButton: {
    padding: 8,
    marginLeft: 8,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoContent: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryTag: {
    backgroundColor: '#FF6B3515',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#FF6B35',
    fontFamily: 'Inter-Medium',
  },
  performanceSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#059669',
    fontFamily: 'Inter-Bold',
  },
  performanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceMetric: {
    alignItems: 'center',
  },
  performanceMetricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
  },
  performanceMetricLabel: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  productsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  productCard: {
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
  productRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B3515',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productRankText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
    fontFamily: 'Inter-Bold',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  productSales: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  productCommission: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
    fontFamily: 'Inter-Bold',
  },
  termsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  termsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  termBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B35',
    marginTop: 6,
    marginRight: 12,
  },
  termText: {
    flex: 1,
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },});

export default CampaignDetails;
