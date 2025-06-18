import React, { useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import ProductContext from '../api/ProductsContext';
import CategorieContext from '../api/CategoriesContext';
import Card from '../components/Card';
import AppText from '../components/AppText';
import colors from '../config/colors';
import LottieView from 'lottie-react-native'; // ✅ Add this at the top

const { width } = Dimensions.get('window');

const ListingScreen = () => {
  const navigation = useNavigation();
  const { listings, loadListings } = useContext(ProductContext);
  const { categories, loadCategories } = useContext(CategorieContext);

  useEffect(() => {
    loadListings();
    loadCategories();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search Product"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
             <Image
            source={require('../../assets/Wamia_Icon_Black.png')}
            style={styles.searchIcon}
          />


        </View>

          {/* Greeting and Icon */}
     <View style={styles.headerContainer}>
  <Text style={styles.greetingText}>مرحبا بيك في ومية!</Text>
  <LottieView
    source={require('../../assets/animations/animation.json')}
    autoPlay
    loop
    style={styles.greetingAnimation}
  />
</View>


        {/* Categories */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <FlatList
          data={categories}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <Image source={{ uri: item.image }} style={styles.categoryImage} />
              <Text style={styles.categoryLabel}>{item.name}</Text>
            </View>
          )}
        />

        {/* Products to Promote */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Produits à Promouvoir</Text>
        </View>
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <Card
                title={item.title}
                subTitle={
                  <View>
                    <AppText style={styles.priceText}>${item.price}</AppText>
                    <AppText style={styles.commissionText}>Commission $15</AppText>
                  </View>
                }
                onPress={() => navigation.navigate("ListingDetails", { product: item })}
                imageUrl={item.images[0]}
              />
            </View>
          )}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greetingAnimation: {
  width: 150,
  height: 150,
  marginTop: 5,
},

  screen: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
headerContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 15,
  flexDirection: 'column',
},

  searchIcon: {
  width: 22,
  height: 22,
  marginLeft: 8,
  resizeMode: 'contain',
},

  headerIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  greetingText: {
    fontSize: 31,
    color: "#E67E22",
    fontWeight: 'bold',
        fontFamily: 'Tajawal-Regular',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 44,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 10,
    marginTop: 20
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
       color: "#E67E22",

    fontWeight: 'bold',
        fontFamily: 'Roboto-Medium',
  },
  categoryList: {
    paddingVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 9,
  },
  categoryImage: {
    height: 60,
    width: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  categoryLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  productList: {
    paddingVertical: 10,
  },
  cardWrapper: {
    flex: 1,
    margin: 8,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#232323',
  },
  commissionText: {
    color: 'green',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ListingScreen;
