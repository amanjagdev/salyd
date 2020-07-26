import React, { useState, useContext } from "react"
import { Button, TextInput } from "react-native-paper";
import { CommonActions } from '@react-navigation/native';
import { apiUrl } from '../../../config/keys';

import { GlobalContext } from "../../../context/GlobalState";

import {
    View,
    AsyncStorage,
    StyleSheet,
    Alert,
    Dimensions,
} from "react-native";

import Header from '../../../components/Header';
import { colors } from "../../../constants/constant";

const JoinTable = (props) => {

    const [localRoomId, setLocalRoomID] = useState(null);
    const [name, setName] = useState(null);

    const { token,updateRoom,updateTable } = useContext(GlobalContext)

    const enterId = async () => {
        //If user has token(logged in) then let him/her enter only the roomId

        if (token) {
            fetch(`${apiUrl}/addmember`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    "roomId": localRoomId
                })
            }).then((res) => res.json())
                .then(async (data) => {
                    if (data.error) {
                        Alert.alert("Wrong roomId");
                    }
                    else {
                        //Storing the roomId
                        updateRoom(data.roomId)
                        Alert.alert("Successfully added to the table");
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: 'Menu',
                                    },
                                ],
                            })
                        );
                    }
                })
        }

        else {
            //If user not logged in then make him/her enter the roomId and name(for unique identity)
            fetch(`${apiUrl}/registerandaddmember`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": name,
                    "roomId": localRoomId
                })
            }).then((res) => res.json())
                .then(async (data) => {
                    console.log(data.id);
                    if (data.error) {
                        Alert.alert("Wrong roomId");
                    }
                    else {
                        updateRoom(data.result.roomId)
                        updateTable("123456123");
                        await AsyncStorage.setItem("userId", (data.id).toString());

                        Alert.alert("Successfully added to the table");
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: 'Menu',
                                    },
                                ],
                            })
                        );
                    }
                })
        }

    }

    return (
        <View>
            <Header>Join Table</Header>
            {token ? (
                <View style={styles.container}>

                    <TextInput
                        label="Enter room Id"
                        mode="outlined"
                        value={name}
                        theme={{ roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                        onChangeText={(text) => setLocalRoomID(text)} />

                    <Button
                        mode="contained"
                        color={colors.accentPrimary}
                        style={{...styles.button,marginTop: 30}}
                        onPress={() => enterId()}
                    >
                        Join Room
                    </Button>
                </View>)
                :
                (<View style={styles.container}>

                    <TextInput
                        label="Enter room Id"
                        mode="outlined"
                        value={localRoomId}
                        theme={{ roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                        onChangeText={(text) => setLocalRoomID(text)} />

                    <TextInput
                        label="Enter Name"
                        mode="outlined"
                        value={name}
                        theme={{ roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                        onChangeText={(text) => setName(text)} />

                    <Button
                        mode="contained"
                        color={colors.accentPrimary}
                        style={styles.button}
                        onPress={() => enterId()}
                    >
                        Join Room
                    </Button>
                </View>)

            }
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        fontSize: 18,
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18
    },
    container: {
        backgroundColor: colors.back,
        height: Dimensions.get("screen").height,
        padding: 20
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

export default JoinTable;