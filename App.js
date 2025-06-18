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
import { ProductProvider } from './app/api/ProductsContext';
import { CategorieProvider } from './app/api/CategoriesContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(true);

  const [fontsLoaded] = useFonts({
    Tajawal_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUser(true); // simulate auth
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setTimeout(() => setShowSplash(false), 2000);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ProductProvider>
        <CategorieProvider>
          <NavigationContainer theme={navigationTheme}>
            {showSplash ? (
              <SplashScreenn />
            ) : user ? (
              <AppNavigator />
            ) : (
              <AuthNavigation />
            )}
          </NavigationContainer>
        </CategorieProvider>
      </ProductProvider>
    </View>
  );
}
