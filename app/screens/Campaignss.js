import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Target,
  DollarSign,
  TrendingUp,
  Eye,
  Copy,
  Share2,
  Clock,
  CircleCheck as CheckCircle,
  CircleAlert as AlertCircle,
  ChevronRight,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import AppHeader from '../components/AppHeader';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CampaignsContext from '../context/CampaignsContext';
import * as Clipboard from 'expo-clipboard'; // Correct import for Expo Clipboard API
import Screen from '../components/Screen';

const IMAGE_BASE_URL = 'http://dev.wamia.tn';

const Campaignss = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigation = useNavigation();
  const { campaigns, loading, error, loadCampaigns } = useContext(CampaignsContext);
  const [refreshing, setRefreshing] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      loadCampaigns && loadCampaigns();
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCampaigns();
    setRefreshing(false);
  };

  // Helper for status color and text
  const getStatusColor = status => status === 1 ? '#059669' : '#EF4444';
  const getStatusText = status => status === 1 ? 'Active' : "Expired";
  const getStatusIcon = status => status === 1 ? CheckCircle : AlertCircle;

  // Copy referral link using Expo Clipboard
  const copyReferralLink = (link) => {
    Clipboard.setString(link);  // Use Clipboard API to set the referral link in the clipboard
    Alert.alert(t('common.copied'), t('campaigns.copiedLink'));  // Show an alert when the link is copied
  };

  const shareReferralLink = campaign => {
    Alert.alert('Share Campaign', `Sharing ${campaign.name} campaign link`);
  };

  // Featured campaign: first in the list
  const featuredCampaign = campaigns && campaigns.length > 0 ? campaigns[0] : null;

  return (
    <Screen style={[styles.container, isRTL && styles.rtlContainer]}>
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {/* Featured Campaign */}
        {featuredCampaign && (
          <>
            <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
              {t('campaigns.featuredCampaign')}
            </Text>
            <View style={styles.featuredCampaign}>
              <ImageBackground
                source={{ uri: featuredCampaign.images_url?.[0]?.replace('https://dev.wamia.tn', IMAGE_BASE_URL) }}
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
                        {featuredCampaign.name}
                      </Text>
                    </View>
                    <Text style={[styles.featuredDescription, isRTL && styles.rtlText]}>
                      {featuredCampaign.description}
                    </Text>
                    <View style={[styles.featuredStats, isRTL && styles.rtlFeaturedStats]}>
                      <View style={styles.featuredStat}>
                        <Text style={[styles.featuredStatValue, isRTL && styles.rtlText]}>
                          {featuredCampaign.discount_amount}%
                        </Text>
                        <Text style={[styles.featuredStatLabel, isRTL && styles.rtlText]}>
                          {t('campaigns.discount')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          </>
        )}
        {/* All Campaigns */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
          {t('campaigns.allCampaigns')}
        </Text>
        <View style={styles.campaignsList}>
          {campaigns.map((campaign, idx) => {
            const StatusIcon = getStatusIcon(campaign.status);
            return (
              <TouchableOpacity
                key={campaign.campaign_id}
                style={styles.campaignCard}
                onPress={() => navigation.navigate('CampaignDetails', { campaign })}
              >
                <Image source={{ uri: campaign.images_url?.[0]?.replace('https://dev.wamia.tn', IMAGE_BASE_URL) }} style={styles.campaignImage} />
                <View style={styles.campaignContent}>
                  <View style={[styles.campaignHeader, isRTL && styles.rtlCampaignHeader]}>
                    <Text style={[styles.campaignName, isRTL && styles.rtlText]}>
                      {campaign.name}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) + '15' }]}> 
                      <StatusIcon size={12} color={getStatusColor(campaign.status)} />
                      <Text style={[styles.statusText, { color: getStatusColor(campaign.status) }, isRTL && styles.rtlText]}>
                        {getStatusText(campaign.status)}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.campaignDescription, isRTL && styles.rtlText]} numberOfLines={2}>
                    {campaign.description}
                  </Text>
                  <View style={[styles.campaignActions, isRTL && styles.rtlCampaignActions]}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => copyReferralLink(campaign.referral_link)}>
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
                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('CampaignDetails', { campaign })}>
                      <ChevronRight size={16} color="#64748B" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
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
  featuredStats:{ flexDirection:'row', justifyContent:'center' },
  featuredStat:{ alignItems:'center', backgroundColor:'rgba(255,255,255,0.2)', borderRadius:12, paddingHorizontal:16, paddingVertical:8 },
  featuredStatValue:{ fontSize:32, fontWeight:'800', color:'#FFF', marginBottom:4, textShadowColor:'rgba(0,0,0,0.3)', textShadowOffset:{width:0,height:2}, textShadowRadius:4 },
  featuredStatLabel:{ fontSize:14, color:'#FFF', opacity:0.9, fontWeight:'600' },
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
