import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import AppText from '../components/AppText';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ACCENT = '#FF6B35';
const YELLOW = '#FACC15';

const ListingDetails = ({ navigation }) => {
  const route = useRoute();
  const product = route.params?.product;

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Swiper for Images */}
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        showPagination
        paginationStyleItem={{ width: 8, height: 8, marginHorizontal: 4 }}
        data={product.images}
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

      {/* Thumbnails */}
      <View style={styles.thumbnailContainer}>
        <FlatList
          data={product.images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.thumbnailImage} />
          )}
        />
      </View>

      {/* Price and Share Button */}
      <View style={styles.priceRow}>
        <View>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Partager</Text>
        </TouchableOpacity>
      </View>

      {/* Gagner Section */}
      <View style={styles.gainRow}>
        <Feather name="dollar-sign" size={30} color={YELLOW} style={{ marginRight: 4 }} />
        <Text style={styles.gainText}>Gagner 10 DT</Text>
      </View>

      {/* Product Details */}
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Titre</Text>
          <Text style={styles.detailValue}>{product.title}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Catégorie</Text>
          <Text style={styles.detailValue}>{product.category.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Description</Text>
          <Text style={styles.detailValue}>{product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  thumbnailContainer: {
    paddingVertical: 10,
    paddingLeft: 14,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: ACCENT,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  gainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 12,
  },
  gainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  detailsSection: {
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
  },
});

export default ListingDetails;
