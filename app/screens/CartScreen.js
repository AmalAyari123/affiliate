import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CartContext from '../api/cartContext';

const { width } = Dimensions.get('window');
const ACCENT = '#FF6B35';

const CartScreen = () => {
  const { cartItems } = useContext(CartContext);
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#9CA3AF" style={{ marginHorizontal: 8 }} />
        <TextInput
          placeholder="Search Product"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('ListingDetails', { product: item })}
          >
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.stock}>Stock: 512</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.commission}>Commission ${item.commission || 25}</Text>
            </View>
            <TouchableOpacity style={styles.promoteButton}>
              <Text style={styles.promoteText}>Promouvoir</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Add more product button */}
      <TouchableOpacity style={styles.addButton}>
        <Feather name="plus" size={18} color="#FF6B35" />
        <Text style={styles.addButtonText}>Add more product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 8,
    marginBottom: 16,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#111',
  },
  stock: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6,
    color: '#111',
  },
  commission: {
    fontSize: 13,
    color: '#6B7280',
  },
  promoteButton: {
    backgroundColor: ACCENT,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  promoteText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FF6B35',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  addButtonText: {
    marginLeft: 8,
    color: '#FF6B35',
    fontWeight: '600',
    fontSize: 14,
  },
});
