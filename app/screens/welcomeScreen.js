import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import AppText from "../components/AppText";
import Button from "../components/Button";
import colors from "../config/colors";

function WelcomeScreen({navigation}) {
    return ( 
       <ImageBackground 
       blurRadius={10}
       source={require("../../assets/background.jpg")}
       style={styles.background }
       >

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
          <Button title="Register" color={colors.white} textColor={colors.primary} style={{color:'yellow'}} onPress={() => navigation.navigate("Register")}/>  
</View>
      <View style={styles.logoContainer}>
      <Image source={require("../../assets/logo-red.png")}
        style={styles.logo}/>
        <AppText stylee={{marginTop : 10}}>You can sell anything!</AppText>
      </View>

       </ImageBackground> 
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1 , 
        justifyContent: "flex-end",
        alignItems: "center"


    },
    logoContainer: {
      position: "absolute",
      top: 70,
      alignItems: "center",
    },
   buttonContainer:{
padding: 10, 
width: "100%"


   },
      logo:{
        width:100,
        height:100
      },
     

    
});

export default WelcomeScreen;

