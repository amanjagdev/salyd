import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { colors } from '../constants/constant';

const Button = ({ children, onPressFunction, colorBack, colorText, mystyle, width }) => {
    return (
        <TouchableOpacity onPress={onPressFunction} >
            <View style={{
                alignItems: "center",
                backgroundColor: colorBack ? colorBack : colors.accentPrimary,
                width: width ? width : 100,
                height: 40,
                justifyContent: "space-around",
                borderRadius: 10,
                ...mystyle,
            }}>
                <Text style={{
                    color: colorText ? colorText : "white",
                    fontSize: 16,
                    fontFamily: "ProductSans"
                }}>
                    {children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button
