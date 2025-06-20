import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Globe, Check, X } from 'lucide-react-native';
import { useLanguage } from '../hooks/useLanguage';


export const LanguageSelector = ({ showModal = false, onClose }) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, getLanguageFlag, getLanguageName, isRTL } = useLanguage();
  const [modalVisible, setModalVisible] = useState(showModal);

  const languages = ['en', 'fr', 'ar'];

  const handleLanguageChange = async (language) => {
    await changeLanguage(language);
    setModalVisible(false);
    if (onClose) onClose();
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    if (onClose) onClose();
  };

  return (
    <>
      <TouchableOpacity style={styles.trigger} onPress={openModal}>
        <Globe size={20} color="#64748B" />
        <Text style={[styles.triggerText, isRTL && styles.rtlText]}>
          {getLanguageFlag(currentLanguage)} {getLanguageName(currentLanguage)}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isRTL && styles.rtlModal]}>
            <View style={[styles.modalHeader, isRTL && styles.rtlHeader]}>
              <Text style={[styles.modalTitle, isRTL && styles.rtlText]}>
                {t('language.selectLanguage')}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <X size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.languageList}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language}
                  style={[
                    styles.languageItem,
                    currentLanguage === language && styles.selectedLanguageItem,
                    isRTL && styles.rtlLanguageItem
                  ]}
                  onPress={() => handleLanguageChange(language)}
                >
                  <View style={[styles.languageInfo, isRTL && styles.rtlLanguageInfo]}>
                    <Text style={styles.languageFlag}>
                      {getLanguageFlag(language)}
                    </Text>
                    <Text style={[styles.languageName, isRTL && styles.rtlText]}>
                      {getLanguageName(language)}
                    </Text>
                  </View>
                  {currentLanguage === language && (
                    <Check size={20} color="#FF6B35" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  triggerText: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
  },
  languageList: {
    padding: 20,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
  },
  selectedLanguageItem: {
    backgroundColor: '#FF6B3515',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
  },
  // RTL styles
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlModal: {},
  rtlHeader: {
    flexDirection: 'row-reverse',
  },
  rtlLanguageItem: {
    flexDirection: 'row-reverse',
  },
  rtlLanguageInfo: {
    flexDirection: 'row-reverse',
  },
});
