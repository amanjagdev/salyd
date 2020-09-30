import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button'

const Splash = ({ navigation }) => {
    const login = () => {
        navigation.push("Login")
    }
    const signup = () => {
        navigation.push("SignUp");
    }
    const guestLogin = () => {
        navigation.push("Guest");
    }
    return (
        <View style={styles.slideContainer}>
            <Text style={styles.title}>Welcome to Salyd</Text>
            <Text style={styles.text}>The ultimate solution to the contactless dinning with best user experience</Text>
            <View style={styles.imagecontainer}>
                <Image style={styles.image} source={require("../assets/logo_col.png")} />
            </View>
            <View style={{
                margin: 40
            }}>
                <Button onPressFunction={signup}  mystyle={{
                    marginBottom: 15
                }}>Sign Up</Button>
                <Button onPressFunction={login} colorBack="#b8ffb5" colorText="#069600">Login</Button>
            </View>
            <TouchableOpacity onPress={() => guestLogin()}>
                <Text style={styles.bottomText}> Or, Use as a Guest ?</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    slideContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontFamily: "ProductSansBold",
        fontSize: 32,
        marginTop: 140,
        paddingHorizontal: 70,
        textAlign: "center",
    },
    text: {
        color: "#333",
        fontSize: 16,
        opacity: 60,
        fontFamily: "ProductSans",
        marginTop: 20,
        paddingHorizontal: 80,
        textAlign: "center"
    },
    imagecontainer: {
        marginTop: 30
    },
    image: {
        width: 200,
        height: 190,
        margin: 40
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 164,
        height: 50,
        borderRadius: 32,
        backgroundColor: "#0ef07b",
        marginTop: 50
    },
    secondButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 164,
        height: 50,
        borderRadius: 32,
        backgroundColor: "white",
        borderWidth: 2,
        marginTop: 15
    },
    buttonText: {
        fontFamily: "ProductSans",
        fontSize: 15,
        letterSpacing: 1,
        color: "black"
    },
    bottomText: {
        fontFamily: "ProductSans",
        fontSize: 14,
        opacity: 60,
        color: "#069600",
        marginTop: 15,
    }
});

export default Splash