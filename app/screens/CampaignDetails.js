import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Clipboard, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Share2, Copy, Eye, TrendingUp, DollarSign, Calendar, Users, Target, Gift, Clock, CircleCheck as CheckCircle, Star, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useState } from 'react';
import TransactionsContext from '../context/TransactionsContext';

const IMAGE_BASE_URL = 'http://dev.wamia.tn';

const CampaignDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { campaign } = route.params;
  const { transactions, loadTransactions } = useContext(TransactionsContext);
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };
  if (transactions.length > 0) {
    console.log('Sample transaction:', transactions[0]);
  }
  const commissionTransactions = transactions.filter(
    tx => tx.type === 1 && String(tx.campaign_id) === String(campaign.campaign_id)
  );

  // Helper functions (copied from Comissions.js for consistency)
  function getTransactionIcon(type) {
    if (type === 1) return CheckCircle;
    if (type === 2) return ArrowLeft;
    return DollarSign;
  }
  function getTransactionColor(type) {
    if (type === 1) return '#10B981';
    if (type === 2) return '#3B82F6';
    return '#64748B';
  }
  function getStatusColor(status) {
    if (status === 3) return '#10B981';
    if (status === 2) return '#F59E0B';
    return '#64748B';
  }
  function getStatusText(status) {
    if (status === 3) return 'Completed';
    if (status === 2) return 'Pending';
    return 'Unknown';
  }
  function formatDate(dateString) {
    if (!dateString) return '';
    const d = new Date(dateString);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
  }

  const getStatusIcon = status => status === 1 ? CheckCircle : AlertCircle;

  const copyReferralLink = async () => {
    try {
      await Clipboard.setString(campaign.referral_link);
      Alert.alert('Copied!', 'Referral link copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy link to clipboard');
    }
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

  // Calculate days left until campaign expires
  let expirySentence = '';
  if (campaign.to_date) {
    const now = new Date();
    const expiryDate = new Date(campaign.to_date);
    // Zero out time for accurate day diff
    now.setHours(0,0,0,0);
    expiryDate.setHours(0,0,0,0);
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      expirySentence = `This campaign expires in ${diffDays} day${diffDays > 1 ? 's' : ''}.`;
    } else if (diffDays === 0) {
      expirySentence = `This campaign expires today.`;
    } else {
      expirySentence = `This campaign has expired.`;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
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
          <Image source={{ uri: campaign.images_url?.[0]?.replace('https://dev.wamia.tn', IMAGE_BASE_URL) }} style={styles.heroImage} />
          <LinearGradient
            colors={['rgba(255, 107, 53, 0.7)', 'rgba(30, 64, 175, 0.7)']}
            style={styles.heroOverlay}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroHeader}>
                <Text style={styles.heroTitle}>{campaign.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) + '15' }]}> 
                  {React.createElement(getStatusIcon(campaign.status), { size: 16, color: getStatusColor(campaign.status) })}
                  <Text style={[styles.statusText, { color: getStatusColor(campaign.status) }]}> {getStatusText(campaign.status)}</Text>
                </View>
              </View>
              <Text style={styles.heroDescription}>{campaign.description}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Expiry Info */}
        {expirySentence ? (
          <View style={{
            backgroundColor: '#FFF7ED',
            borderRadius: 12,
            padding: 12,
            marginHorizontal: 20,
            marginBottom: 12,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#FDBA74'
          }}>
            <Text style={{
              color: '#FF6B35',
              fontWeight: '700',
              fontSize: 15,
              fontFamily: 'Inter-Bold'
            }}>
              {expirySentence}
            </Text>
          </View>
        ) : null}

        {/* Commission Stats - First Row */}
        <View style={styles.commissionStatsSection}>
          <View style={styles.commissionStatCard}>
            <Clock size={24} color="#F59E0B" />
            <Text style={styles.statValue}>{campaign.commission_pending }</Text>
            <Text style={styles.statLabel}>Pending Commission</Text>
          </View>
          <View style={styles.commissionStatCard}>
            <DollarSign size={24} color="#059669" />
            <Text style={styles.statValue}>{campaign.commission_earned}</Text>
            <Text style={styles.statLabel}>Earned Commission</Text>
          </View>
        </View>

        {/* Other Stats - Second Row with margin */}
        <View style={styles.otherStatsSection}>
          <View style={styles.statCard}>
            <Gift size={24} color="#7C3AED" />
            <Text style={styles.statValue}>{campaign.discount_amount}%</Text>
            <Text style={styles.statLabel}>Discount</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#FF6B35" />
            <Text style={styles.statValue}>{campaign.conversion_rate}</Text>
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
            <Text style={styles.linkText} numberOfLines={1}>{campaign.referral_link}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyReferralLink}>
              <Copy size={18} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Orders Section */}
        <View style={styles.linkSection}>
          <Text style={styles.sectionTitle}>Orders</Text>
          {commissionTransactions.length === 0 ? (
            <Text style={{ color: '#64748B', fontStyle: 'italic', marginTop: 8 }}>No orders yet.</Text>
          ) : (
            commissionTransactions.map((tx, i) => {
              const Icon = getTransactionIcon(tx.type);
              const description = `Commission from ${tx.customer_firstname || tx.extension_attributes?.customer_firstname || ''} ${tx.customer_lastname || tx.extension_attributes?.customer_lastname || ''}`;
              const amount = `+$${tx.amount}`;
              const statusText = getStatusText(tx.status);
              return (
                <View key={tx.transaction_id || i} style={styles.transactionItem}>
                  <View style={[styles.transactionIcon, { backgroundColor: `${getTransactionColor(tx.type)}15` }]}> 
                    <Icon size={20} color={getTransactionColor(tx.type)} />
                  </View>
                  <View style={styles.transactionInfo}>
                    <View style={styles.transactionHeader}>
                      <Text style={styles.transactionDescription}>{description}</Text>
                      <Text style={[styles.transactionAmount, { color: '#10B981' }]}>{amount}</Text>
                    </View>
                    <View style={styles.transactionFooter}>
                      <Text style={styles.transactionDate}>{formatDate(tx.created_at)}</Text>
                      <Text style={[styles.transactionOrderId, { flex: 1 }]} numberOfLines={1} ellipsizeMode="tail">{tx.product_name || ''}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(tx.status)}15`, marginLeft: 8, alignSelf: 'center' }]}> 
                        <Text style={[styles.statusText, { color: getStatusColor(tx.status) }]}>{statusText}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          )}
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  statusText: {
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
  // Commission Stats - First Row
  commissionStatsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  commissionStatCard: {
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
  // Other Stats - Second Row with margin
  otherStatsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    marginTop: 5,
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
  },
  transactionItem: {
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
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  transactionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginRight: 8,
  },
  transactionOrderId: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginRight: 8,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
  },
});

export default CampaignDetails;
