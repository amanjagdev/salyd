import React from 'react';
import { StyleSheet, Text, View, Linking, Image, Dimensions } from 'react-native';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { colors } from '../../../constants/constant';
import { FontAwesome5 } from '@expo/vector-icons';

const Contact = ({ navigation }) => {
    const details = {
        phone: "8077XXXXXX",
        email: "salyd@mail.com",
        address: "Esteria Towers\n Times Square Callison Lane\n Portland, DE 97205",
    };

    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${phone}`)
        }
        else {
            Linking.openURL(`telprompt:${phone}`)
        }
    }

    return (
        <React.Fragment>
            <Header navigation={navigation} isBack>Contact Us</Header>
            <View style={styles.container}>
                {/* TOP SECTION  */}
                <View style={{
                    margin: 50,
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Image style={{
                        height: 150, width: 150
                    }} source={require('../../../assets/logo_col.png')} />
                    <Text style={{
                        fontFamily: "ProductSansBold",
                        fontSize: 32,
                        marginTop: 15,
                        color: colors.accentPrimary
                    }}>Salyd</Text>
                </View >

                {/* MIDDLE SECTION  */}
                <View style={{
                    margin: 30,
                    padding: 20,
                    borderRadius: 20,
                    flexDirection: "column",
                    backgroundColor: "white",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                }}>
                    <Text style={{
                        fontFamily: "ProductSansBold",
                        fontSize: 22,
                        textAlign: "center"
                    }}> Details </Text>

                    <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}>
                        <FontAwesome5 name="phone" size={24} color="#54cfff" />
                        <Text style={{
                            fontFamily: "ProductSansBold",
                            marginLeft: 10
                        }}> {details.phone} </Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}>
                        <FontAwesome5 name="at" size={24} color="#ffaa54" />
                        <Text style={{
                            fontFamily: "ProductSansBold",
                            marginLeft: 10
                        }}> {details.email} </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 15, alignItems: "flex-start" }}>
                        <FontAwesome5 name="home" size={24} color="#ff707e" />
                        <Text style={{
                            fontFamily: "ProductSansBold",
                            marginLeft: 10
                        }}> {details.address} </Text>
                    </View>

                </View >


                {/* BITTOM SECTION  */}
                <View style={{
                    width: "100%",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 30
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: "ProductSans"
                    }}>Made with <FontAwesome5 name="heart" size={18} color="red" /> by Salyd Team</Text>
                </View>
            </View >
        </React.Fragment >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        height: Dimensions.get("screen").height - 110
    },
    title: {
        fontFamily: "DMSansRegular",
        fontSize: 20,
        marginTop: 40,
        marginLeft: 10
    },
    cardContainer: {
        marginTop: 30
    },
    mycard: {
        margin: 3
    },
    cardContent: {
        flexDirection: "row",
        padding: 10
    },
    icon: {
        fontSize: 32,
        paddingRight: 10,
        fontWeight: "bold",
        color: "#00de5c"
    },
    mytext: {
        fontSize: 16,
        marginTop: 3,
        fontFamily: "DMSansRegular",
        marginLeft: 5
    },
    button: {
        backgroundColor: colors.accentPrimary,
        color: colors.back,
        marginTop: 30,
        fontFamily: "DMSans"
    }
})
export default Contact