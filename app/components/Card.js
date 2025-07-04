import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {Image} from 'react-native-expo-image-cache' ; 

import AppText from "./AppText";
import colors from "../config/colors";

function Card({ title, subTitle, onPress ,imageUrl ,  thumnaiUrl}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.card}>
      <Image style={styles.image} uri={imageUrl} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.subTitle}>{subTitle}</AppText>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
   
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
