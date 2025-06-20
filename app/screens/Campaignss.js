// app/screens/Campaigns.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Target,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Copy,
  Share2,
  Gift,
  Zap,
  Clock,
  CircleCheck as CheckCircle,
  CircleAlert as AlertCircle,
  ChevronRight,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import AppHeader from '../components/AppHeader';
import { useNavigation } from '@react-navigation/native';

const Campaignss = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
    const navigation = useNavigation();
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaignStats = [
    { title: t('campaigns.activeCampaigns'), value: '8', icon: Target, color: '#FF6B35' },
    { title: t('campaigns.totalClicks'),    value: '2,456', icon: Eye,      color: '#1E40AF' },
    { title: t('campaigns.conversions'),    value: '89',    icon: TrendingUp, color: '#7C3AED' },
    { title: t('campaigns.commissionRate'), value: '15%',   icon: DollarSign, color: '#059669' },
  ];

  const activeCampaigns = [
    {
      id: '1',
      name: t('campaigns.summerSale'),
      description: t('campaigns.summerSaleDesc'),
      image: 'https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=800',
      commission: '20%',
      discount:   '15%',
      startDate:  '2024-06-01',
      endDate:    '2024-08-31',
      status:     'active',
      clicks:     456,
      conversions:23,
      earnings:   '$345.50',
      tier:       'Gold',
      referralLink:'https://customer.wamia.tn/summer-sale?ref=WAMIA123',
    },
    // ...other campaigns
  ];

  const getStatusColor = status => {
    if (status === 'active')   return '#059669';
    if (status === 'upcoming') return '#F59E0B';
    if (status === 'expired')  return '#EF4444';
    return '#64748B';
  };

  const getStatusIcon = status => {
    if (status === 'active')   return CheckCircle;
    if (status === 'upcoming') return Clock;
    if (status === 'expired')  return AlertCircle;
    return Target;
  };

  const getTierColor = tier => {
    if (tier === 'Bronze')   return '#CD7F32';
    if (tier === 'Silver')   return '#C0C0C0';
    if (tier === 'Gold')     return '#FFD700';
    if (tier === 'Platinum') return '#E5E4E2';
    return '#64748B';
  };

  const copyReferralLink = link => {
    Alert.alert(t('common.copied'), 'Referral link copied to clipboard');
  };

  const shareReferralLink = campaign => {
    Alert.alert('Share Campaign', `Sharing ${campaign.name} campaign link`);
  };


  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtlContainer]} edges={['top']}>
      <AppHeader 
        title={t('navigation.campaigns')}
        variant="gradient"
        showLogo
        showActions
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Campaign Stats */}
        <View style={[styles.statsContainer, isRTL && styles.rtlStatsContainer]}>
          {campaignStats.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <Text style={[styles.statValue, isRTL && styles.rtlText]}>{stat.value}</Text>
              <Text style={[styles.statTitle, isRTL && styles.rtlText]}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* Featured Campaign */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
          {t('campaigns.featuredCampaign')}
        </Text>
        <View style={styles.featuredCampaign}>
          <ImageBackground
            source={{ uri: activeCampaigns[0].image }}
            style={styles.featuredImage}
            imageStyle={styles.featuredImageStyle}
          >
            <LinearGradient
              colors={['rgba(255,107,53,0.7)','rgba(30,64,175,0.7)']}
              style={styles.featuredOverlay}
            >
              <View style={styles.featuredContent}>
                <View style={[styles.featuredHeader, isRTL && styles.rtlFeaturedHeader]}>
                  <Text style={[styles.featuredTitle, isRTL && styles.rtlText]}>
                    {activeCampaigns[0].name}
                  </Text>
                  <View style={[styles.tierBadge, { backgroundColor: getTierColor(activeCampaigns[0].tier) }]}>
                    <Text style={styles.tierText}>{activeCampaigns[0].tier}</Text>
                  </View>
                </View>
                <Text style={[styles.featuredDescription, isRTL && styles.rtlText]}>
                  {activeCampaigns[0].description}
                </Text>
                <View style={[styles.featuredStats, isRTL && styles.rtlFeaturedStats]}>
                  <View style={styles.featuredStat}>
                    <Text style={[styles.featuredStatValue, isRTL && styles.rtlText]}>
                      {activeCampaigns[0].commission}
                    </Text>
                    <Text style={[styles.featuredStatLabel, isRTL && styles.rtlText]}>
                      {t('campaigns.commission')}
                    </Text>
                  </View>
                  {/* ... conversions & earnings */}
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* All Campaigns */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
          {t('campaigns.allCampaigns')}
        </Text>
        <View style={styles.campaignsList}>
          {activeCampaigns.map((campaign, idx) => {
            const StatusIcon = getStatusIcon(campaign.status);
            return (
              <TouchableOpacity
                key={idx}
                style={styles.campaignCard}
                        onPress={() => navigation.navigate('CampaignDetails')}
              >
                <Image source={{ uri: campaign.image }} style={styles.campaignImage} />
                <View style={styles.campaignContent}>
                  <View style={[styles.campaignHeader, isRTL && styles.rtlCampaignHeader]}>
                    <Text style={[styles.campaignName, isRTL && styles.rtlText]}>
                      {campaign.name}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) + '15' }]}>
                      <StatusIcon size={12} color={getStatusColor(campaign.status)} />
                      <Text style={[styles.statusText, { color: getStatusColor(campaign.status) }, isRTL && styles.rtlText]}>
                        {campaign.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.campaignDescription, isRTL && styles.rtlText]} numberOfLines={2}>
                    {campaign.description}
                  </Text>
                  <View style={[styles.campaignActions, isRTL && styles.rtlCampaignActions]}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => copyReferralLink(campaign.referralLink)}>
                      <Copy size={16} color="#FF6B35" />
                      <Text style={[styles.actionButtonText, isRTL && styles.rtlText]}>
                        {t('campaigns.copyLink')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => shareReferralLink(campaign)}>
                      <Share2 size={16} color="#059669" />
                      <Text style={[styles.actionButtonText, isRTL && styles.rtlText]}>
                        {t('common.share')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailsButton}>     
                      <ChevronRight size={16} color="#64748B" />
                    </TouchableOpacity>
                  </View>
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
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  statsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginTop:16, marginBottom:32 },
  statCard: { flex:1, backgroundColor:'#FFF', borderRadius:12, padding:16, marginHorizontal:4, alignItems:'center', elevation:2 },
  statIcon: { width:40, height:40, borderRadius:20, justifyContent:'center', alignItems:'center', marginBottom:8 },
  statValue: { fontSize:20, fontWeight:'700', color:'#0F172A', marginBottom:4 },
  statTitle: { fontSize:12, color:'#64748B', textAlign:'center' },
  sectionTitle: { fontSize:20, fontWeight:'700', color:'#0F172A', paddingHorizontal:20, marginBottom:16 },
  featuredCampaign:{ marginHorizontal:20, marginBottom:32, borderRadius:16, overflow:'hidden', height:200 },
  featuredImage:{ flex:1 },
  featuredImageStyle:{ borderRadius:16 },
  featuredOverlay:{ flex:1, padding:20, justifyContent:'flex-end' },
  featuredContent:{ flex:1, justifyContent:'space-between' },
  featuredHeader:{ flexDirection:'row', justifyContent:'space-between', marginBottom:8 },
  featuredTitle:{ fontSize:24, fontWeight:'700', color:'#FFF', flex:1 },
  tierBadge:{ borderRadius:12, paddingHorizontal:8, paddingVertical:4, marginLeft:8 },
  tierText:{ fontSize:12, fontWeight:'600', color:'#000' },
  featuredDescription:{ fontSize:16, color:'#FFF', opacity:0.9, marginBottom:16 },
  featuredStats:{ flexDirection:'row', justifyContent:'space-between' },
  campaignsList:{ paddingHorizontal:20, marginBottom:32 },
  campaignCard:{ backgroundColor:'#FFF', borderRadius:16, marginBottom:16, elevation:2 },
  campaignImage:{ width:'100%', height:120 },
  campaignContent:{ padding:16 },
  campaignHeader:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8 },
  campaignName:{ fontSize:18, fontWeight:'700', color:'#0F172A', flex:1 },
  statusBadge:{ flexDirection:'row', alignItems:'center', borderRadius:12, paddingHorizontal:8, paddingVertical:4, marginLeft:8 },
  statusText:{ fontSize:12, marginLeft:4, textTransform:'capitalize' },
  campaignDescription:{ fontSize:14, color:'#64748B', marginBottom:12, lineHeight:20 },
  campaignActions:{ flexDirection:'row', alignItems:'center' },
  actionButton:{ flexDirection:'row', alignItems:'center', backgroundColor:'#F8FAFC', borderRadius:8, paddingHorizontal:12, paddingVertical:8, marginRight:8 },
  actionButtonText:{ fontSize:12, marginLeft:4, color:'#64748B' },
  detailsButton:{ marginLeft:'auto', padding:8 },
  // RTL
  rtlContainer:{ writingDirection:'rtl' },
  rtlText:{ textAlign:'right' },
  rtlStatsContainer:{ flexDirection:'row-reverse' },
  rtlFeaturedHeader:{ flexDirection:'row-reverse' },
  rtlFeaturedStats:{ flexDirection:'row-reverse' },
  rtlCampaignHeader:{ flexDirection:'row-reverse' },
  rtlCampaignActions:{ flexDirection:'row-reverse' },
});

export default Campaignss;
