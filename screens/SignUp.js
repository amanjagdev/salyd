import React, { useState } from 'react';
import { TouchableOpacity, KeyboardAvoidingView, Text, View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Axios from 'axios'

import { apiUrl } from '../config/keys'

//Componenents
import Header from '../components/Header';
import { colors } from '../constants/constant';

const SignUp = ({ navigation }) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const saveDetails = () => {
        Axios.post(`${apiUrl}/signup`, {
            name, phone, email, password
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.error) {
                    Alert.alert(res.data.error)
                }
                else {
                    Alert.alert("Thanks for registering with Salyd");
                    navigation.replace("Login")
                }
            })
            .catch(err => console.log(err))
    }

    const loginRedirect = () => {
        navigation.navigate("Login");
    }

    return (
        <View style={{ backgroundColor: colors.back, height: 800 }}>

            <KeyboardAvoidingView behavior="position">
                <Header>Sign Up</Header>

                <TextInput
                    label="Full Name"
                    mode="outlined"
                    value={name}
                    style={styles.inputbox}
                    theme={{roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                    onChangeText={(text) => setName(text)}
                />

                <TextInput
                    label="Phone Number"
                    mode="outlined"
                    value={phone}
                    style={styles.inputbox}
                    theme={{roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                    onChangeText={(text) => setPhone(text)}
                />

                <TextInput
                    label="Email Address"
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
                    theme={{ colors: { primary: colors.accentPrimary } }}
                    style={styles.button}
                    onPress={() => saveDetails()} >
                    Sign Up
                </Button>

                <TouchableOpacity onPress={() => loginRedirect()}>
                    <Text style={styles.inputbox} >
                        Already Have an account ? SignIn
                    </Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        marginLeft: 18,
        marginTop: 20,
        fontFamily : "monospace"
    },
    inputbox: {
        marginHorizontal : 25,
        marginTop: 25,
        height : 46,
        fontFamily : "monospace"
    },
    button: {
        margin: 10,
        width : 300,
        borderRadius: 30,
        marginTop: 30,
        marginHorizontal : 50,
        marginBottom: 10,
        color: colors.back,
        fontFamily : "monospace"
    },
    outlined: {
        borderColor: colors.back,
        borderWidth: 1
    },
})

export default SignUp