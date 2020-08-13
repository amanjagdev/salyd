import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../constants/constant'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@ui-kitten/components';

const Header = ({ children, myStyle, navigation }) => {
    const theme = useTheme();
    return (
        <View style={{ ...styles.container, ...myStyle }}>
            <Text style={styles.heading}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent : "center",
        backgroundColor : "#ffffff",
        height : 70,
        borderBottomWidth : 1,
        borderBottomColor : "#d9d7d7"
    },
    heading : {
        padding : 30,
        fontSize : 20,
        fontFamily : "DMSansRegular",
        letterSpacing : 2,
        marginTop : 20
    }
})

export default Header
