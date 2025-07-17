import React from 'react';
import AppText from './AppText';
import { StyleSheet } from 'react-native';

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <AppText stylee={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: { color: 'red', fontSize: 14, marginTop: 4 },
});

export default ErrorMessage; 