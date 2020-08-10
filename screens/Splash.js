import React, { useState } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Layout, Text, useTheme, Button } from '@ui-kitten/components'
import Carousel from "react-native-snap-carousel"
import { colors } from '../constants/constant'
import Header from '../components/Header'

const Splash = ({ navigation }) => {

    const theme = useTheme();

    const [carouselItems, setCarouselItems] = useState([
        {
            title: "Contactless Dinning",
            text: "Scan the qr code on the table and get the instant menu on your screens",
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
                backgroundColor: theme['background-basic-color-4'],
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
                <Text style={{ textAlign: "center", color: theme['text-basic-color'], fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
                <Text style={{ textAlign: "center", color: theme['text-basic-color'] }}>{item.text}</Text>
            </View>
        );
    }

    const handleGuestLogin = () => {
        navigation.navigate('Guest')
    }

    return (
        <View style={{ ...styles.container, backgroundColor: theme['background-basic-color-1'] }}>

            <View style={styles.banner}>
                <Header myStyle={{ marginTop: 0 }}>SALYD</Header>
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
                    onPress={() => navigation.navigate('Login')}
                    status="basic"
                >
                    Login
                </Button>
                <Button
                    style={{ ...styles.button, ...styles.outlined }}
                    status="basic"
                    appearance="outline"
                    onPress={() => navigation.navigate('SignUp')}
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
