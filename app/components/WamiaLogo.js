// app/components/WamiaLogo.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const WamiaLogo = ({
  size = 'medium',
  showText = true,
  style,
}) => {
  const getLogoSize = () => {
    switch (size) {
      case 'small':
        return { width: 80, height: 32, fontSize: 12 };
      case 'large':
        return { width: 140, height: 56, fontSize: 16 };
      default:
        return { width: 100, height: 40, fontSize: 14 };
    }
  };

  const logoSize = getLogoSize();

  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../../assets/logo_wamia_blanc.png')}
        style={[
          styles.logoImage,
          {
            width: logoSize.width,
            height: logoSize.height,
          },
        ]}
        resizeMode="contain"
      />
      {showText && (
        <Text style={[styles.tagline, { fontSize: logoSize.fontSize }]}>
          Ambassador Platform
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoImage: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  tagline: {
    color: '#64748B',
    fontFamily: 'Inter-Medium',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default WamiaLogo;