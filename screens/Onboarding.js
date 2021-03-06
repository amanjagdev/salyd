import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { colors } from '../constants/constant';

const Onboarding = ({ navigation }) => {
    const slides = [
        {
            key: 's1',
            title: 'Order some tasty food',
            text: "Now just scan the qr code and place orders right from your screen",
            image: require("../assets/slide1.png")
        }
        , {
            key: 's2',
            title: 'Order some tasty food',
            text: "Now just scan the qr code and place orders right from your screen",
            image: require("../assets/slide1.png")
        },
        {
            key: 's3',
            title: 'Order some tasty food',
            text: "Now just scan the qr code and place orders right from your screen",
            image: require("../assets/slide1.png")
        }
    ];

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.slideContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
                <View style={styles.imagecontainer}>
                    <Image style={styles.image} source={item.image} />
                </View>
            </View>
        );
    }

    const _onDone = () => {
        console.log("I m here")
        navigation.push("Splash")
    };

    return (
        <AppIntroSlider
            renderItem={_renderItem}
            data={slides}
            onDone={_onDone}
            renderNextButton={() => (
                <View style={{
                    alignItems: "center",
                    backgroundColor: "#b8ffb5",
                    width: 70,
                    height: 40,
                    justifyContent: "space-around",
                    borderRadius: 10,
                }}>
                    <Text style={{
                        color: "#07a600",
                        fontSize: 16,
                        fontFamily: "ProductSans"
                    }}>
                        Next
                </Text>
                </View>
            )}
            renderDoneButton={() => (
                <View style={{
                    alignItems: "center",
                    backgroundColor: "#b8ffb5",
                    width: 70,
                    height: 40,
                    justifyContent: "space-around",
                    borderRadius: 10,
                }}>
                    <Text style={{
                        color: "#07a600",
                        fontSize: 16,
                        fontFamily: "ProductSans"
                    }}>
                        Done
                </Text>
                </View>
            )}
            renderSkipButton={() => (
                <View style={{
                    alignItems: "center",
                    backgroundColor: "#b8ffb5",
                    width: 70,
                    height: 40,
                    justifyContent: "space-around",
                    borderRadius: 10,
                }}>
                    <Text style={{
                        color: "#07a600",
                        fontSize: 16,
                        fontFamily: "ProductSans"
                    }}>
                        Skip
                </Text>
                </View>
            )}
            showSkipButton
            activeDotStyle={{ backgroundColor: "#07a600" }}
        />
    );
}

export default Onboarding;


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
        fontSize: 25,
        marginTop: 150,
        paddingHorizontal: 70,
        textAlign: "center"
    },
    text: {
        color: "black",
        fontSize: 14,
        opacity: 60,
        fontFamily: "ProductSans",
        marginTop: 20,
        paddingHorizontal: 80,
        textAlign: "center"
    },
    imagecontainer: {
        marginTop: 100
    },
    image: {
        width: 300,
        height: 300
    }
});
