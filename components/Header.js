import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../constants/constant'

const Header = ({ children, myStyle }) => {
    return (
        <View style={{ ...styles.container, ...myStyle }}>
            <Image source={require('../assets/logo.jpg')} style={{
                width: 50,
                height: 50,
                marginRight: 15
            }} />
            <Text style={{
                color: colors.accentPrimary,
                fontSize: 30,
                fontWeight: "bold",
            }}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.back,
        marginTop: 32,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    }
})

export default Header
