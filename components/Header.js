import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../constants/constant';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = ({ children, myStyle, navigation, isBack, isUser }) => {
    return (
        <View style={{ ...styles.container, ...myStyle }}>
            {
                (navigation.canGoBack() && isBack) ?
                    <TouchableOpacity style={{
                        paddingRight: 40
                    }}
                        onPress={() => navigation.goBack()}>
                        <Ionicons name="ios-arrow-back" size={28} />
                    </TouchableOpacity>
                    : <View />
            }

            <Text style={{ ...styles.heading, paddingLeft: !(isBack && navigation.canGoBack()) ? 50 : 0, paddingRight: !isUser ? 50 : 0 }}>{children}</Text>

            {
                isUser ?

                    <TouchableOpacity style={{
                        paddingLeft: 40
                    }}
                        onPress={() => navigation.push("Profile")}
                    >
                        <FontAwesome5 name="user-circle" size={28} color="black" />
                    </TouchableOpacity>
                    : <View />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#ffffff",
        marginTop: 32
    },
    heading: {
        fontSize: 20,
        fontFamily: "ProductSansBold",
        letterSpacing: 0.7,
    }
})

export default Header
