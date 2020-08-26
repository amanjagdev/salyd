import React from "react"
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from "react-native"
import Header from "../components/Header"

const ForgotPassword = ({ navigation }) => {
    return (
        <>
            <Header isBack navigation={navigation} >Forgot Password</Header>
            <View style={styles.container}>
                <Text style={{
                    fontSize: 24,
                    fontFamily: "ProductSans",
                }}>No content Here yet </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("screen").height - 100 ,
        backgroundColor: "#fff"
    }
})

export default ForgotPassword