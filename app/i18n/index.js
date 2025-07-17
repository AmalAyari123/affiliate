// app/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

const resources = { en: { translation: en }, fr: { translation: fr }, ar: { translation: ar } };

i18n
  .use(initReactI18next)
  .init({
    resources,
    // guard against undefined
    lng: (Localization.locale || 'en-US').split('-')[0],
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v3',
  });

export default i18n;
