import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Modal, Dimensions } from 'react-native';
<<<<<<< HEAD
=======
import { SafeAreaView } from 'react-native-safe-area-context';
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
import { ArrowLeft, Share2, Copy, Eye, TrendingUp, ChartBar as BarChart3, Calendar, Download, Code, Link, X } from 'lucide-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import CampaignsContext from '../context/CampaignsContext';
import he from 'he';
<<<<<<< HEAD
import Screen from '../components/Screen';
=======
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908

// Utility to extract all image URLs from HTML content
function extractImageUrls(html) {
  if (!html) return [];
<<<<<<< HEAD

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
=======
  // Step 1: Decode HTML entities
  const decodedContent = he.decode(html);
  // Step 2: Extract all media paths using a tolerant regex
  const regex = /\{\{\s*media\s+url\s*=\s*"([^"]+)"\s*\}\}/gi;
  let matches, urls = [];
  while ((matches = regex.exec(decodedContent))) {
    const relativePath = matches[1];
    // Step 3: Build the full URLs using the base media URL
    const fullUrl = 'http://192.168.1.38/media/' + relativePath;
    urls.push(fullUrl);
  }
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
  return urls;
}

const { width } = Dimensions.get('window');
<<<<<<< HEAD
const IMAGE_BASE_URL = 'https://dev.wamia.tn';
=======
const IMAGE_BASE_URL = 'http://192.168.1.38';
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908

function prefixImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return IMAGE_BASE_URL + url;
}

const BannerDetails = () => {
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedCodeType, setSelectedCodeType] = useState('html');
  const route = useRoute();
  const navigation = useNavigation();
  const banner = route.params?.banner;
  const { campaigns } = useContext(CampaignsContext);

  if (!banner) {
    return (
      <View style={styles.centered}>
        <Text>Banner not found.</Text>
      </View>
    );
  }

  const campaign = campaigns.find(c => c.campaign_id === banner.campaign_id);
  const images = extractImageUrls(banner.content).map(prefixImageUrl);
<<<<<<< HEAD
  
  console.log('Banner Details - Extracted images:', images);
=======
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908

  const getStatusColor = (status) => {
    switch (status) {
      case 1: return '#10B981';
      case 0: return '#EF4444';
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
        return banner.content;
      case 'link':
        return banner.link;
      case 'markdown':
        return `[![${banner.title}](${images[0]})](${banner.link})`;
      default:
        return banner.content;
    }
  };

  return (
<<<<<<< HEAD
    <Screen style={styles.container}>
=======
    <SafeAreaView style={styles.container}>
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Banner Details</Text>
          <TouchableOpacity style={styles.shareButton} onPress={shareBanner}>
            <Share2 size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Swiper for Images */}
<<<<<<< HEAD
        {images.length > 0 && (
          <SwiperFlatList
            data={images}
            showPagination
            paginationStyleItem={{ width: 8, height: 8, marginHorizontal: 4 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image
                  style={styles.mainImage}
                  source={{ uri: item }}
                  resizeMode="contain"
                  onError={(error) => console.log('Image load error:', error)}
                  onLoad={() => console.log('Image loaded successfully:', item)}
                />
              </View>
            )}
          />
        )}

        {/* Banner Info */}
        <View style={styles.detailsSection}>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Title</Text>
              <Text style={styles.detailValue}>{banner.title}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Campaign</Text>
              <Text style={styles.detailValue}>{campaign ? campaign.name : banner.campaign_id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(banner.status)}15` }]}>
                <Text style={[styles.statusText, { color: getStatusColor(banner.status) }]}>
                  {banner.status === 1 ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Created At</Text>
              <Text style={styles.detailValue}>{banner.created_at}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
=======
        <SwiperFlatList
          data={images}
          showPagination
          paginationStyleItem={{ width: 8, height: 8, marginHorizontal: 4 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image
                style={styles.mainImage}
                source={{ uri: item }}
                resizeMode="contain"
              />
            </View>
          )}
        />

        {/* Banner Info */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Title</Text>
            <Text style={styles.detailValue}>{banner.title}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Campaign</Text>
            <Text style={styles.detailValue}>{campaign ? campaign.name : banner.campaign_id}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={[styles.detailValue, { color: getStatusColor(banner.status) }]}>
              {banner.status === 1 ? 'Active' : 'Inactive'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Created At</Text>
            <Text style={styles.detailValue}>{banner.created_at}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Updated At</Text>
            <Text style={styles.detailValue}>{banner.updated_at}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
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
  imageContainer: {
    width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  detailsSection: {
<<<<<<< HEAD
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailLabel: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  detailValue: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    textAlign: 'right',
    flex: 1,
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
=======
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  detailRow: {
    marginBottom: 14,
  },
  detailLabel: {
    fontSize: 16,
    color: '#111',
    fontWeight: '700',
    marginBottom: 4,
  },
  detailValue: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BannerDetails;
