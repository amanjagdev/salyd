import React, { useState } from 'react';
import { TouchableOpacity, KeyboardAvoidingView, Text, StyleSheet,Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Axios from 'axios'

import {apiUrl} from '../config/keys'

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
            name,phone,email,password
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
        <KeyboardAvoidingView behavior="position">
            <Header>Sign Up</Header>
            <Text
                style={styles.heading} >
                Create new account
                </Text>

            <TextInput
                label="Name"
                mode="outlined"
                value={name}
                style={styles.inputbox}
                theme={{ colors: { primary: colors.accentPrimary } }}
                onChangeText={(text) => setName(text)}
            />

            <TextInput
                label="Phone"
                mode="outlined"
                value={phone}
                style={styles.inputbox}
                theme={{ colors: { primary: colors.accentPrimary } }}
                onChangeText={(text) => setPhone(text)}
            />

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
                onPress={() => saveDetails()} >
                SignUp
                </Button>

            <TouchableOpacity onPress={() => loginRedirect()}>
                <Text style={styles.inputbox} >
                    Already Have an account ? SignIn
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

export default SignUp