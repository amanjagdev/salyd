import React, { useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { CommonActions } from '@react-navigation/native';
import {
    Text,
    AsyncStorage,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
    Alert
} from "react-native";
import Axios from 'axios'

import {apiUrl} from '../config/keys';

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

        <KeyboardAvoidingView behavior="position">
            <Header>Login</Header>

            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                style={styles.inputbox}
                theme={{ colors: { primary: colors.accentPrimary } }}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                label="Password"
                mode="outlined"
                value={password}
                secureTextEntry={true}
                style={styles.inputbox}
                theme={{ colors: { primary: colors.accentPrimary } }}
                onChangeText={(text) => setPassword(text)}
            />

            <Button
                mode="contained"
                theme={{ colors: { primary: colors.accentPrimary } }}
                style={styles.button}
                onPress={() => signin(props)} >

                Login
                </Button>

            <TouchableOpacity onPress={() => signUpRedirect()}>
                <Text style={styles.inputbox} >
                    Dont Have an account ? SignUp
                    </Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        marginLeft: 18,
        marginTop: 20
    },
    inputbox: {
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18
    },
    button: {
        fontSize: 18,
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18
    }
})

export default Login