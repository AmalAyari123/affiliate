import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

function Screen({ children, style, stylee }) {
  return (
    <SafeAreaView style={[styles.screen, style]} edges={['left', 'right', 'bottom']}>
      <View style={[{flex: 1}, stylee]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen; 