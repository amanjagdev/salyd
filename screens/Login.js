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
    Dimensions
} from "react-native";
import Axios from 'axios'

//State
import { GlobalContext } from '../context/GlobalState';

//Config
import { apiUrl } from '../config/keys';

//Components
import Header from '../components/Header';
import Button from "../components/Button";
import { colors } from "../constants/constant";

const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, isSubmitting] = useState(false);

    const { updateUser, user, token, updateToken } = useContext(GlobalContext);

    const signin = () => {
        isSubmitting(true)
        Axios.post(`${apiUrl}/signin`, {
            "email": email,
            "password": password
        })
            .then(async (res) => {
                updateToken(res.data.token)
                updateUser(res.data.user)
                
                //Updating asyncstorage for persistence
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
        navigation.navigate("SignUp");
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
                        submitting ? < ActivityIndicator color={colors.accentPrimary} /> : (
                            <Button onPressFunction={() => signin()}>Logout</Button>
                        )
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

                <TouchableOpacity onPress={() => forgotPass()}>
                    <Text style={{
                        marginHorizontal: 25,
                        marginTop: 25,
                        fontSize: 16,
                        paddingLeft: 10,
                        borderRadius: 20,
                        color: colors.accentPrimary,
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
    header: {
        marginTop: 100,
        fontSize: 25
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
    },
    outlined: {
        borderColor: colors.back,
        borderWidth: 1
    },
})

export default Login