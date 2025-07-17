import React from 'react';
import {  Text,TouchableOpacity,View , StyleSheet} from 'react-native';
import colors from '../config/colors';


function Button({title , onPress , color , textColor }) {
    return (
       <TouchableOpacity style={[styles.Button , {backgroundColor : color || colors.primary} ]} onPress={onPress}>
        <Text style={[styles.text, {color : textColor || colors.white}] }>{title}</Text>

       </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    Button: {
        backgroundColor: colors.primary,
        borderColor : colors.primary,
        borderWidth:1,
        borderRadius : 25,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 15,
        width: '100%',
        marginVertical : 10,
    

        
    },

    text: {
        color: colors.white,
        fontSize : 18,
        fontWeight : "bold"
    }
})

export default Button;