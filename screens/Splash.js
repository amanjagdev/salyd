import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import Carousel from "react-native-snap-carousel"
import { colors } from '../constants/constant'
import Header from '../components/Header'

const Splash = ({ navigation }) => {
    const [carouselItems, setCarouselItems] = useState([
        {
            title: "Fastest Service",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, sit!",
            image: require("../assets/carousel0.png")
        },
        {
            title: "Secure Service",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, sit!",
            image: require("../assets/carousel0.png")
        },
        {
            title: "Speedy Service",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, sit!",
            image: require("../assets/carousel0.png")
        },
    ])
    const [activeIndex, setActiveIndex] = useState(0)

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: colors.back,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 0
                },
                shadowOpacity: 0.01,
                shadowRadius: 2,
                elevation: 12,
                height: 350,
                marginTop: 10,
                marginBottom: 40,
                padding: 30,
                marginLeft: 25,
                marginRight: 25,
                alignItems: "center"
            }}>
                <Image style={styles.bannerImage} source={item.image} />
                <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
                <Text style={{ textAlign: "center", color: colors.text }}>{item.text}</Text>
            </View>
        );
    }

    const handleGuestLogin = () => {
        navigation.navigate('MainApp')
    }

    return (
        <View style={styles.container}>

            <View style={styles.banner}>
                <Header myStyle={{marginTop: 0}}>SALYD</Header>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: "center",
                    height: 500
                }}>
                    <Carousel
                        layout={"default"}
                        data={carouselItems}
                        sliderWidth={370}
                        itemWidth={370}
                        renderItem={_renderItem}
                        onSnapToItem={index => setActiveIndex(index)} />
                </View>
            </View>

            <View style={styles.bottom}>
                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={() => navigation.navigate('Login')}
                    theme={{ colors: { primary: colors.back } }}
                >
                    Login
                </Button>
                <Button
                    style={{ ...styles.button, ...styles.outlined }}
                    onPress={() => navigation.navigate('SignUp')}
                    color={colors.back}
                >
                    Sign Up
                </Button>
                <TouchableOpacity onPress={() => handleGuestLogin()}>
                    <Text style={{
                        color: colors.back
                    }}>Dont want Login, Guest Login </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.back,
        marginTop: 32,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    bottom: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        justifyContent: 'flex-end',
        padding: 30,
        backgroundColor: colors.accentPrimary,
    },
    button: {
        borderRadius: 50,
        marginBottom: 20
    },
    outlined: {
        borderColor: colors.back,
        borderWidth: 1
    },
    banner: {
        padding: 10,
        height: 500,
        alignItems: "center",
        justifyContent: "space-around"
    },
    bannerImage: {
        height: 200,
        width: 200,
        marginBottom: 20
    }
})

export default Splash
