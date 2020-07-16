import React, { useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { CommonActions } from '@react-navigation/native';
import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
    Alert
} from "react-native";
import Axios from 'axios'

import { apiUrl } from '../config/keys';

//Components
import Header from '../components/Header';
import { colors } from "../constants/constant";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signin = (props) => {
        Axios.post(`${apiUrl}/signin`, {
            "email": email,
            "password": password
        })
            .then(async (data) => {
                try {
                    await AsyncStorage.setItem('token', data.token);
                    Alert.alert("Successfully logged in");

                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'profile',
                                },
                            ],
                        })
                    );
                }
                catch {
                    Alert.alert(data.error);
                }
            })
    }

    const signUpRedirect = () => {
        props.navigation.navigate("SignUp");
    }
    return (

        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
                <Header>LOGIN</Header>

                <TextInput
                    label="Email"
                    mode="outlined"
                    value={email}
                    style={styles.inputbox}
                    theme={{roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                    label="Password"
                    mode="outlined"
                    value={password}
                    secureTextEntry={true}
                    style={styles.inputbox}
                    theme={{roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                    onChangeText={(text) => setPassword(text)}
                />

                <Button
                    mode="contained"
                    color={colors.accentPrimary}
                    style={styles.button}
                    onPress={() => signin(props)}
                >
                    Login
                </Button>

                <TouchableOpacity onPress={() => signUpRedirect()}>
                    <Text style={styles.inputbox} >
                        Dont Have an account ? SignUp
                    </Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 800,
        padding: 10,
        backgroundColor: colors.back
    },
    inputbox: {
        margin: 10,
    },
    button: {
        margin: 10,
        borderRadius: 50,
        marginBottom: 20,
        color: colors.back
    },
    outlined: {
        borderColor: colors.back,
        borderWidth: 1
    },
})

export default Login