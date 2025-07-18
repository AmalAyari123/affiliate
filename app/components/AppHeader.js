// app/components/AppHeader.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Menu } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import useLanguage  from '../hooks/useLanguage';
import WamiaLogo from './WamiaLogo';


export function AppHeader({
  title,
  showLogo = true,
  showActions = true,
<<<<<<< HEAD
  backgroundColor = '#2C3E50',
=======
  backgroundColor = '#FFFFFF',
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
  variant = 'default',
  onMenuPress,
}) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [selectedCampaign, setSelectedCampaign] = useState(null); // example if you need local state

  const renderHeaderContent = () => (
    <View style={[styles.headerContent, isRTL && styles.rtlHeaderContent]}>
      <View style={[styles.headerLeft, isRTL && styles.rtlHeaderLeft]}>
        {onMenuPress && (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={onMenuPress}
          >
            <Menu
              size={24}
              color={variant === 'gradient' ? '#FFFFFF' : '#0F172A'}
            />
          </TouchableOpacity>
        )}
        {showLogo && (
          <WamiaLogo size="medium" showText={false} style={styles.logo} />
        )}
        {title && (
          <Text
            style={[
              styles.headerTitle,
              isRTL && styles.rtlText,
              variant === 'gradient' && styles.gradientText,
            ]}
          >
            {title}
          </Text>
        )}
      </View>

      {showActions && (
        <View
          style={[
            styles.headerActions,
            isRTL && styles.rtlHeaderActions,
          ]}
        >
          <TouchableOpacity style={styles.notificationButton}>
            <Bell
              size={20}
<<<<<<< HEAD
              color={variant === 'gradient' ? '#FFFFFF' : '#FFFFFF'}
=======
              color={variant === 'gradient' ? '#FFFFFF' : '#64748B'}
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (variant === 'gradient') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <LinearGradient
<<<<<<< HEAD
          colors={['#2C3E50', '#34495E']}
=======
          colors={['#FF6B35', '#F59E0B', '#1E40AF']}
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
          style={styles.gradientHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {renderHeaderContent()}
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (variant === 'transparent') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <View
          style={[styles.transparentHeader, { backgroundColor }]}
        >
          {renderHeaderContent()}
        </View>
      </SafeAreaView>
    );
  }

  // default
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor}
      />
      <View
        style={[styles.defaultHeader, { backgroundColor }]}
      >
        {renderHeaderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  defaultHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  transparentHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logo: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
<<<<<<< HEAD
    color: '#FFFFFF',
=======
    color: '#0F172A',
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
    fontFamily: 'Inter-Bold',
  },
  gradientText: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
<<<<<<< HEAD
    backgroundColor: 'rgba(255,255,255,0.2)',
=======
    backgroundColor: 'rgba(255,255,255,0.9)',
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
    borderRadius: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
<<<<<<< HEAD
    backgroundColor: '#E74C3C',
=======
    backgroundColor: '#FF6B35',
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
  // RTL support
  rtlHeaderContent: {
    flexDirection: 'row-reverse',
  },
  rtlHeaderLeft: {
    flexDirection: 'row-reverse',
  },
  rtlHeaderActions: {
    flexDirection: 'row-reverse',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
export default AppHeader;
