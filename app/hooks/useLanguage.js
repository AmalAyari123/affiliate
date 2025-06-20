// app/hooks/useLanguage.js
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('userLanguage');
      let lang = saved;
      if (!lang || !['en','fr','ar'].includes(lang)) {
        // safe fallback if undefined
        const raw = Localization.locale || 'en-US';
        lang = raw.split('-')[0];
        if (!['en','fr','ar'].includes(lang)) lang = 'en';
      }
      setCurrentLanguage(lang);
      i18n.changeLanguage(lang);
    })();
  }, []);

  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem('userLanguage', lang);
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return {
    currentLanguage,
    changeLanguage,
    isRTL: currentLanguage === 'ar',
  };
};

export default useLanguage;
