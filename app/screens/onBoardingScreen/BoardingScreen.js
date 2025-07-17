import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Tilt from '../../../assets/Tilt.svg'; // SVG background shape

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const ACCENT = '#E67E22';
const BG = '#FFFFFF';

const slides = [
  {
    key: '1',
    title: 'إكتشف العروض',
    subtitle: 'Découvre des produits à promouvoir facilement',
    animation: require('../../../assets/animations/discover.json'),
  },
  {
    key: '2',
    title: 'برطاجي لوفْر متاعك',
    subtitle: 'Partage tes liens et gagne des commissions',
    animation: require('../../../assets/animations/share.json'),
  },
  {
    key: '3',
    title: 'و إربح مع كل vente !',
    subtitle: 'كل منتج تروّج عليه يجيب لك ربح سريع!',
    animation: require('../../../assets/animations/earn.json'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Register');
    }
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* Background SVG Shape */}
            <View style={styles.shapeWrapper}>
              <Tilt width={width} height={180} />
            </View>

            {/* Stacked Card */}
            <View style={styles.cardWrapper}>
              <View style={styles.card}>
                <View style={styles.animationWrapper}>
                  <LottieView
                    source={item.animation}
                    autoPlay
                    loop
                    style={styles.animation}
                  />
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>

                <TouchableOpacity style={styles.circleButton} onPress={handleNext}>
                  <Text style={styles.buttonText}>
                    {currentIndex === slides.length - 1 ? 'Suivant' : 'Suivant'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              currentIndex === i && { backgroundColor: ACCENT },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  shapeWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  cardWrapper: {
    marginTop: 130,
    zIndex: 1,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingTop: 40,
    paddingBottom: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    position: 'relative',
  },
  animationWrapper: {
    width: CARD_WIDTH * 0.7,
    height: CARD_WIDTH * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#222',
    fontFamily: 'Tajawal-Regular',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  circleButton: {
    backgroundColor: ACCENT,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
  },
  dot: {
    height: 6,
    width: 20,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
});


