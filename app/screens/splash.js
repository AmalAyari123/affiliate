import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from 'react-native';


const SplashScreenn = () => {
  const shadowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create continuous subtle shadow animation
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(shadowAnimation, {
          toValue: 1,
          duration: 4000, // Slower animation for subtle effect
          useNativeDriver: false,
        })
      ).start();
    };

    startAnimation();
  }, [shadowAnimation]);

  // Interpolate the animation value to create subtle shadow movement
  const shadowX = shadowAnimation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 3, 0, -3, 0],
  });

  const shadowY = shadowAnimation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [-3, 0, 3, 0, -3],
  });

  const shadowOpacity = shadowAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 0.6, 0.4],
  });

  return (
    <View style={styles.container}>
      {/* Animated Shadow */}
      <Animated.View
        style={[
          styles.logoShadow,
          {
            transform: [
              { translateX: shadowX },
              { translateY: shadowY },
            ],
            opacity: shadowOpacity,
          },
        ]}
      >
        <Image
          source={require('../../assets/logo_wamia_blanc.png')} // Add your logo image to assets folder
          style={[styles.logoImage, styles.shadowTint]}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Main Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo_wamia_blanc.png')} // Add your logo image to assets folder
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Activity Indicator */}
      <View style={styles.indicatorContainer}>
        <ActivityIndicator 
          size="large" 
          color="#FF6B35" 
          style={styles.indicator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'relative',
    zIndex: 2,
  },
  logoImage: {
    width: 200,
    height: 80,
  },
  logoShadow: {
    position: 'absolute',
    zIndex: 1,
  },
  shadowTint: {
    tintColor: '#E67E22',
    opacity: 0.5,
  },
  indicatorContainer: {
    marginTop: 40,
  },
  indicator: {
    transform: [{ scale: 1.5 }],
  },
});

export default SplashScreenn;