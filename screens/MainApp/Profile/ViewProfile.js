import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { MaterialCommunityIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons'

//Context
import { GlobalContext } from '../../../context/GlobalState';
import { colors } from '../../../constants/constant';
import Axios from 'axios';
import { localapiUrl } from "../../../config/keys";

const width = Dimensions.get("window").width;

const ViewProfile = ({ navigation }) => {

    const { user, token } = useContext(GlobalContext);
    const { _id, name, email, phone, image } = user;

    const logout = async () => {
        const token = await AsyncStorage.removeItem("token")
        const user = await AsyncStorage.removeItem("user")
        if (!token) {
            navigation.replace("Login");
        }
    }
    console.log(image)

    return (
        <React.Fragment>
            <Header navigation={navigation} isBack> View Profile </Header>
            <View style={styles.root}>
                <View style={{ alignItems: "center" }}>
                    <Image
                        style={{ width: 140, height: 140, borderRadius: 140 / 2, marginTop: 50 }}
                        source={{ uri: (image ? image : "https://sanjaymotels.com/wp-content/uploads/2019/01/testimony.png") }}
                    />

                </View>
                <View style={{ alignItems: "center", margin: 15 }}>
                    <Text style={styles.name}> {name} </Text>
                </View>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('EditProfile', {
                        name, email, phone
                    })
                }}>
                    <View style={styles.cardContainer}>
                        <View style={styles.mycard}>
                            <View style={styles.cardContent}>
                                <FontAwesome name="user-circle" style={styles.icon} />
                                <Text style={styles.mytext}>Account Details</Text>
                                <Ionicons name="ios-arrow-forward" style={styles.arrow} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('RecentOrders')
                }}>
                    <View style={styles.mycard}>
                        <View style={styles.cardContent}>
                            <MaterialCommunityIcons name="food-variant" style={styles.icon} />
                            <Text style={styles.mytext}>Order History</Text>
                            <Ionicons name="ios-arrow-forward" style={styles.arrow} />
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => {
                    navigation.navigate('Contact')
                }}>

                    <View style={styles.mycard} onPress={() => {
                        navigation.navigate('Contact')
                    }}>
                        <View style={styles.cardContent}>
                            <Feather name="phone-call" style={styles.icon} />
                            <Text style={styles.mytext}>Contact Us</Text>
                            <Ionicons name="ios-arrow-forward" style={styles.arrow} />
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Button onPressFunction={() => logout()}>Logout</Button>
                </View>

            </View>
        </React.Fragment>
    )
}



const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 10
    },
    cardContainer: {
        marginTop: 30
    },
    name: {
        fontFamily: "ProductSans",
        fontSize: 24,
    },
    changedp: {
        fontFamily: "ProductSans",
        fontSize: 20,
        color: colors.back.accentPrimary
    },
    mycard: {
        margin: 3
    },
    cardContent: {
        flexDirection: "row",
        padding: 10
    },
    icon: {
        fontSize: 28,
        paddingRight: 10,
        fontWeight: "bold",
        color: "#00de5c"
    },
    arrow: {
        position: "absolute",
        right: 20,
        paddingTop: 10,
        fontSize: 30,
        color: "#c0c0c0"
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white"

    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    button: {
        backgroundColor: colors.accentPrimary,
        color: colors.back,
        width: width * 0.85,
        marginLeft: width * 0.08,
        marginTop: 50,
        borderRadius: 10,
        fontFamily: "ProductSans"
    },
    buttonpaper: {
        backgroundColor: colors.accentPrimary,
        fontFamily: "ProductSans"
    },
    mytext: {
        fontSize: 18,
        marginTop: 3,
        fontFamily: "ProductSans",
        marginLeft: 5
    }
})

export default ViewProfile