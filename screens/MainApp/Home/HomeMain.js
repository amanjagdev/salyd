import React, { useState } from "react"
import { Button, TextInput } from "react-native-paper";
import { CommonActions } from '@react-navigation/native';

import {
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    Alert,
} from "react-native"


const HomeMain = (props) => {

    const [tableId, setTableId] = useState(null);

    const logout = async (props) => {
        const token = await AsyncStorage.removeItem("token")
        const user = await AsyncStorage.removeItem("user")
        if (!token) {
            props.navigation.replace("Login");
        }
    }

    const joinTable = (props) => {
        props.navigation.navigate('jointable');
    }

    const newTable = async (props) => {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        fetch("http://26191dd2a3f2.ngrok.io/newtable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "tableId": tableId
            })
        }).then((res) => res.json())
            .then(async (data) => {
                if (data.error) {
                    Alert.alert("Sorry, Incorrect Table Id");
                }
                else {
                    await AsyncStorage.setItem('tableId', data._id);
                    Alert.alert("Table Created Successfully");
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'permission',
                                    params: { roomId: data.roomId }
                                },
                            ],
                        })
                    );
                }
            })
    }
    return (
        <View>
            <Button
                mode="contained"
                theme={{ colors: { primary: "#0bb016" } }}
                style={styles.button}
                onPress={() => logout(props)} >

                Logout
        </Button>

            <Button
                mode="contained"
                theme={{ colors: { primary: "#0bb016" } }}
                style={styles.button}
                onPress={() => joinTable(props)} >

                Join Table
        </Button>

            <Button
                mode="contained"
                theme={{ colors: { primary: "#0bb016" } }}
                style={styles.button}
                onPress={() => scanQrc(props)} >

                Scan QR Code
        </Button>

            <Text style={{ margin: 15 }}> Please enter the tableId mentioned below the QR code placed on your table</Text>
            <TextInput
                label="Enter table id"
                mode="outlined"
                value={tableId}
                style={{ margin: 15 }}
                theme={{ colors: { primary: "#0bb016" } }}
                onChangeText={(text) => setTableId(text)}
            />

            <Button
                mode="contained"
                theme={{ colors: { primary: "#0bb016" } }}
                style={styles.button}
                onPress={() => newTable(props)} >

                Proceed
        </Button>


        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        fontSize: 18,
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18
    }
})
export default HomeMain;