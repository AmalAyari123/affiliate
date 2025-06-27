import './app/i18n';

import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import { Tajawal_700Bold } from '@expo-google-fonts/tajawal';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import AuthNavigation from './app/navigation/AuthNavigation';
import AppNavigator from './app/navigation/AppNavigator';
import SplashScreenn from './app/screens/splash';
import navigationTheme from './app/navigation/navigationTheme';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { CampaignsProvider } from './app/context/CampaignsContext';
import { BannersProvider } from './app/context/BannersContext';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Tajawal_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    const prepare = async () => {
      // Simulate loading assets, etc.
      await new Promise((resolve) => setTimeout(resolve, 1500));
    };
    
    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
      setTimeout(() => setShowSplash(false), 2000);
    }
  }, [fontsLoaded, isLoading]);

  // don't render until fonts are loaded
  if (!fontsLoaded || isLoading) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer theme={navigationTheme}>
        <BannersProvider>
          <CampaignsProvider>
            {showSplash ? (
              <SplashScreenn />
            ) : isAuthenticated ? (
              <AppNavigator />
            ) : (
              <AuthNavigation />
            )}
          </CampaignsProvider>
        </BannersProvider>
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <BannersProvider>
      <AuthProvider>
        <CampaignsProvider>
          <AppContent />
        </CampaignsProvider>
      </AuthProvider>
    </BannersProvider>
  );
}
