import React, { useState, useContext } from "react"
import { Button, TextInput } from "react-native-paper"
import { CommonActions } from '@react-navigation/native';
import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
    Alert,
    Image
} from "react-native";
import Axios from 'axios'
import GenerateBill from "../screens/MainApp/Home/GenerateBill";

//State
import { GlobalContext } from '../context/GlobalState';

//Congig
import { apiUrl } from '../config/keys';

//Components
import Header from '../components/Header';
import { colors } from "../constants/constant";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { updateUser, user, token, updateToken } = useContext(GlobalContext)
    console.log(user, token)
    const signin = (props) => {
        Axios.post(`${apiUrl}/signin`, {
            "email": email,
            "password": password
        })
            .then(async (res) => {
                try {
                    updateToken(res.data.token)
                    updateUser(res.data.user)
                    await AsyncStorage.setItem('token', res.data.token);
                    await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
                    Alert.alert("Successfully logged in");

                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'MainApp',
                                },
                            ],
                        })
                    );
                }
                catch {
                    Alert.alert(data.error);
                }
            })
            .catch(err => console.log(err))
    }

    const signUpRedirect = () => {
        props.navigation.navigate("SignUp");
    }
    return (

        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
                <Header>LOGIN</Header>
                
                <Image 
                    source={require("../assets/login.png")}
                    style = {styles.image} />
                <TextInput
                    label="Email"
                    mode="outlined"
                    value={email}
                    style={styles.inputbox}
                    theme={{ roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                    label="Password"
                    mode="outlined"
                    value={password}
                    secureTextEntry={true}
                    style={styles.inputbox}
                    theme={{ roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
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
        backgroundColor: colors.back
    },
    inputbox: {
        marginHorizontal : 25,
        height : 46,
        marginTop : 25,
        fontFamily : "monospace"
    },
    image : {
        width : 200,
        height : 200,
        marginHorizontal : 100
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

export default Login