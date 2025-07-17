import React, { useState, useRef, useEffect } from "react";
import { Dimensions, Text, TextInput, TouchableOpacity, View, Image, Animated, Easing, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Payment() {
  const [withdrawAmount, setWithdrawAmount] = useState(''); // Withdrawal amount
  const [cardNumber, setCardNumber] = useState(''); // Card number input
  const [userName, setUserName] = useState(''); // Card holder's name input
  const [cvc, setCVC] = useState(''); // CVC input
  const [expirationDate, setExpirationDate] = useState(''); // Expiration date input

  // Card Animation
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const [isCVCFocused, setIsCVCFocused] = useState(false);

  // Format the card number with spaces and hidden digits
  const formatCardNumber = () => {
    let formattedNumber = '';
    for (let i = 0; i < 16; i++) {
      if (i < cardNumber.length) {
        formattedNumber += cardNumber[i];
      } else {
        formattedNumber += '•';
      }
      if ((i + 1) % 4 === 0 && i !== 15) {
        formattedNumber += ' ';
      }
    }
    return formattedNumber;
  };

  // Handle CVC Focus and blur animations
  const handleCVCFocus = () => {
    setIsCVCFocused(true);
    Animated.timing(flipAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const handleCVCBlur = () => {
    setIsCVCFocused(false);
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  // Mask the CVC value
  const maskCvc = () => {
    return cvc.replace(/./g, '*');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
      <TouchableOpacity style={styles.iconBack}>
        <Ionicons name="arrow-back" size={28} color="#4c4c4c" />
      </TouchableOpacity>
      <Text style={styles.title}>Withdraw Funds</Text>

      {/* Card Display Section */}
      <View style={{ alignItems: "center", marginTop: 20 }}>
        {/* Always Visa card */}
        <Image source={require('../../assets/visa.png')} style={styles.cardImage} />
        <Text style={styles.numberCard}>{formatCardNumber()}</Text>
      </View>

      {/* Withdrawal Amount Section */}
      <View style={styles.containerPrice}>
        <Text style={styles.textGrey}>Amount to Withdraw</Text>
        <TextInput
          style={styles.input}
          value={withdrawAmount}
          onChangeText={setWithdrawAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
        />
      </View>

      {/* Card Number Input Section */}
      <View style={styles.containerPrice}>
        <Text style={styles.textGrey}>Enter Card Number</Text>
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          placeholder="•••• •••• •••• ••••"
          maxLength={16}
        />
      </View>

      {/* Card Holder's Name Input Section */}
      <View style={styles.containerPrice}>
        <Text style={styles.textGrey}>Card Holder Name</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter name"
        />
      </View>

      {/* CVC Input Section */}
      <View style={styles.containerPrice}>
        <Text style={styles.textGrey}>CVC</Text>
        <TextInput
          style={styles.input}
          value={cvc}
          onChangeText={setCVC}
          onFocus={handleCVCFocus}
          onBlur={handleCVCBlur}
          keyboardType="numeric"
          placeholder="•••"
          maxLength={3}
        />
      </View>

      {/* Expiry Date Input Section */}
      <View style={styles.containerPrice}>
        <Text style={styles.textGrey}>Expiry Date</Text>
        <TextInput
          style={styles.input}
          value={expirationDate}
          onChangeText={setExpirationDate}
          placeholder="MM/YY"
          keyboardType="numeric"
          maxLength={5}
        />
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.textButton}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 30,
    color: '#0a6660', // vert
    fontFamily: 'EbrimaBold',
    fontSize: 26,
  },
  iconBack: {
    paddingTop: 50,
    paddingLeft: 20,
  },
  cardImage: {
    height: 100,
    width: 160,
    marginBottom: 15,
  },
  numberCard: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'EbrimaBold',
    letterSpacing: 3,
    position: 'absolute',
    top: 90,
  },
  containerPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },
  textGrey: {
    color: '#7f7f7f', // grey
    fontFamily: 'Ebrima',
    fontSize: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7f7f7f', // grey
    width: Dimensions.get('window').width - 70,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#0a6660', // vert
    width: 260,
    height: 50,
    margin: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'EbrimaBold',
    fontSize: 18,
    letterSpacing: 1,
  },
});
