import React, { Component } from 'react';
import { Text, View, StyleSheet ,Image,TouchableOpacity} from 'react-native';

const Splash = ({navigation}) => {
    const login = () => {
        navigation.navigation.navigate("Login")
    }
    const signup = () => {
        navigation.navigation.navigate("SignUp");
    }
    const guestLogin = () => {
        navigation.navigate.navigate("Guest");
    } 
    return (
        <View style = {styles.slideContainer}>
        <Text style={styles.title}>Introducing you the Salyd</Text>
        <Text style = {styles.text}>The ultimate solution to the contactless dinning with best user experience</Text>
        <View style = {styles.imagecontainer}>
            <Image style = {styles.image} source = {require("../assets/logo_col_sdw.png")} />
        </View>
        <TouchableOpacity onPress = {() => signup()} style={styles.button}>
            <Text style = {styles.buttonText}> Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => login()} style={styles.secondButton}>
            <Text style = {styles.buttonText}> Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => guestLogin()}>
            <Text style = {styles.bottomText}> Or, Use as a Guest ?</Text>
        </TouchableOpacity>
        
      </View>
    )
}

const styles = StyleSheet.create({
    slideContainer : {
        backgroundColor : "#ffffff",
        flex : 1,
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
    },
    title: { 
        fontFamily : "DMSansBold",
        fontSize : 25,
        marginTop : 150,
        paddingHorizontal : 100,
        textAlign : "center",
        color : "#1c1c1c"
    }, 
    text: { 
        color : "black",
        fontSize: 12,
        opacity : 60,
        fontFamily : "DMSansRegular",
        marginTop : 20,
        paddingHorizontal : 100,
        textAlign : "center"
    }, 
    imagecontainer : {
        marginTop : 30
    },
    image : {
        width : 250,
        height : 250
    },
    button : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        width : 164,
        height : 50,
        borderRadius : 32,
        backgroundColor : "#0ef07b",
        marginTop : 50
    },
    secondButton : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        width : 164,
        height : 50,
        borderRadius : 32,
        backgroundColor : "white",
        borderWidth : 2,
        marginTop : 15
    },
    buttonText : {
        fontFamily : "DMSansBold",
        fontSize : 12,
        letterSpacing : 1,
        color : "black"
    },
    bottomText : {
        fontFamily : "DMSansRegular",
        fontSize : 12,
        opacity : 60,
        marginTop : 15,
        textDecorationLine : "underline"
    }
 });

export default Splash