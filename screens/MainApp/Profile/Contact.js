import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Linking, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Header from '../../../components/Header';
import { Button } from 'react-native-paper'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { GlobalContext } from '../../../context/GlobalState';
import { colors } from '../../../constants/constant';
const width = Dimensions.get("window").width;

const Contact = ({navigation}) => {
    const phone = 7017666017
    const email = "mohanjipuri@gmail.com"
    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${phone}`)
        }
        else {
            Linking.openURL(`telprompt:${phone}`)
        }
    }
    const { restro } = React.useContext(GlobalContext)
    return (
        <View style={styles.container}>
                <KeyboardAvoidingView behavior="position">
                    <Header navigation={navigation} isBack>Contact Us</Header>

                    <Text style={styles.title}> Contact</Text>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity>
                            <View style={styles.mycard}>

                                <View style={styles.cardContent}>
                                    <FontAwesome name="address-card" style={styles.icon} />
                                    <Text style={styles.mytext}>{ restro && (restro.name + " ," + restro.address)}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            Linking.openURL(`mailto:${email}`)
                        }}>
                            <View style={styles.mycard}>
                                <View style={styles.cardContent}>
                                    <MaterialCommunityIcons name="email" style={styles.icon} />
                                    <Text style={styles.mytext}>{email}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <Button
                            mode="contained"
                            onPress={() => openDial()}
                            style={styles.button}>
                            Call Us
                    </Button>

                    </View>
                </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
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