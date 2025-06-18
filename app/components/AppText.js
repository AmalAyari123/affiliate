import { Text , Platform, StyleSheet} from 'react-native';

import React from 'react';

function AppText({ children, stylee, ...otherProps }) {
    return (
      <Text style={[styles.text , stylee]} {...otherProps}>
{children}
      </Text>
    );
}


const styles = StyleSheet.create({
    text:{
       color: "black",
       ...Platform.select(     //spread operator to spread its content in the text 
        {
            ios:{
                fontSize:18,
                fontFamily: "Avenir"
            },
            android: {
                fontSize:18,
                fontFamily: "Roboto"
            }
        }
    ),

    }
})

export default AppText;