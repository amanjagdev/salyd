import React, { useState, useContext } from "react"
import { TextInput, ActivityIndicator } from "react-native-paper"
import { CommonActions } from '@react-navigation/native';
import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
    Alert,
    Image,
    Dimensions
} from "react-native";
import Axios from 'axios'

//State
import { GlobalContext } from '../context/GlobalState';

//Congig
import { apiUrl } from '../config/keys';

//Components
import Header from '../components/Header';
import { colors } from "../constants/constant";

const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, isSubmitting] = useState(false);

    const { updateUser, user, token, updateToken } = useContext(GlobalContext)
    const signin = () => {
        isSubmitting(true)
        Axios.post(`${apiUrl}/signin`, {
            "email": email,
            "password": password
        })
            .then(async (res) => {
                updateToken(res.data.token)
                updateUser(res.data.user)
                await AsyncStorage.setItem('token', res.data.token);
                await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
                isSubmitting(false)
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'MainApp',
                            },
                        ],
                    })
                );
            })
            .catch(err => { isSubmitting(false); console.log(err) })
    }

    const signUpRedirect = () => {
        navigation.navigate("Signup");
    }
    
    const sendOtp = () => {
        navigation.navigate("Otp");
    }

    const forgotPass = () => {
        navigation.navigate("ForgotPassword")
    }
    return (

        <View style={{ ...styles.container, height: Dimensions.get("screen").height }}>
            <KeyboardAvoidingView behavior="position">
                <Header isBack navigation={navigation}>Sign In</Header>
                <TextInput
                    label="Email"
                    value={email}
                    underlineColor="transparent"
                    theme={{ roundness: 20, colors: { primary: colors.accentPrimary } }}
                    style={styles.inputbox}
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                    label="Password"
                    value={password}
                    secureTextEntry={true}
                    underlineColor="transparent"
                    theme={{ roundness: 20, colors: { primary: colors.accentPrimary } }}
                    style={styles.inputbox}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={{
                    alignItems: "center",
                    marginTop: 20,
                }}>
                    {
                        submitting ? < ActivityIndicator color={colors.accentPrimary} /> : <TouchableOpacity onPress={() => signin()}>
                            <View style={{
                                alignItems: "center",
                                backgroundColor: colors.accentPrimary,
                                width: 100,
                                height: 40,
                                justifyContent: "space-around",
                                borderRadius: 10,
                            }}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 16,
                                    fontFamily: "ProductSans"
                                }}>
                                    Login
                    </Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>

                <TouchableOpacity onPress={() => signUpRedirect()}>
                    <Text style={{
                        marginHorizontal: 25,
                        marginTop: 25,
                        fontSize: 16,
                        paddingLeft: 10,
                        borderRadius: 20,
                        fontFamily: "ProductSans"
                    }} >
                        Dont Have an account ? SignUp
                    </Text>
                </TouchableOpacity>

                
                
                <TouchableOpacity onPress={() => sendOtp()}>
                    <Text style={{
                        marginHorizontal: 25,
                        marginTop: 25,
                        fontSize: 16,
                        paddingLeft: 10,
                        borderRadius: 20,
                        fontFamily: "ProductSans"
                    }} >
                        Send Otp
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => forgotPass()}>
                    <Text style={{
                        marginHorizontal: 25,
                        marginTop: 25,
                        fontSize: 16,
                        paddingLeft: 10,
                        borderRadius: 20,
                        fontFamily: "ProductSans"
                    }} >
                        Forgot Password
                    </Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 800,
        backgroundColor: colors.back
    },
    inputbox: {
        marginHorizontal: 25,
        marginTop: 25,
        paddingLeft: 10,
        backgroundColor: "#ddffd9",
        borderRadius: 20,
        fontFamily: "ProductSans"
    },
    image: {
        width: 200,
        height: 200,
        marginHorizontal: 100
    },
    button: {
        margin: 10,
        width: 150,
        borderRadius: 30,
        marginTop: 30,
        marginHorizontal: 50,
        marginBottom: 10,
        color: colors.back,
        fontFamily: "monospace"
    },
    outlined: {
        borderColor: colors.back,
        borderWidth: 1
    },
})

export default Login