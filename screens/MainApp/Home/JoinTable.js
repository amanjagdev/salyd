import React, { useState, useContext } from "react"
import { TextInput } from "react-native-paper";
import { CommonActions } from '@react-navigation/native';
import { apiUrl } from '../../../config/keys';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlobalContext } from "../../../context/GlobalState";

import {
    View,
    AsyncStorage,
    StyleSheet,
    Alert,
    Text,
    Image,
    Dimensions,
} from "react-native";

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { colors } from "../../../constants/constant";

const JoinTable = (props) => {

    const [localRoomId, setLocalRoomID] = useState(null);
    const [name, setName] = useState(null);

    const { token, updateRoom } = useContext(GlobalContext)

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
            <Header navigation={props.navigation} isBack >Join Table</Header>
            {token ? (
                <View style={styles.container}>
                    <View style={{
                        margin: 40, alignItems: "center"
                    }}>
                        <Image source={require("../../../assets/code.png")} />
                    </View>

                    {/* SHARE ID  */}
                    <View style={{
                        flexDirection: "row",
                        backgroundColor: "#d8ffcf",
                        borderRadius: 10,
                        padding: 20,
                        alignItems: "center",
                        marginBottom: 20
                    }}>
                        <FontAwesome5 style={{
                            marginRight: 20
                        }} name="lightbulb" size={24} color="black" />
                        <Text style={{
                            fontFamily: "ProductSans",
                            marginRight: 30
                        }}>Enter the Room Id you got from your colleagues to join the table</Text>
                    </View>

                    <TextInput
                        label="Room Id"
                        value={localRoomId}
                        keyboardType="number-pad"
                        underlineColor="transparent"
                        theme={{ roundness: 20, colors: { primary: colors.accentPrimary } }}
                        style={styles.inputbox}
                        onChangeText={(text) => setLocalRoomID(text)}
                    />

                    <View style={{
                        marginTop: 20,
                        alignItems: "center"
                    }}>
                        <Button onPressFunction={() => enterId()}>Join Room</Button>
                    </View>
                </View>)
                :
                (<View style={styles.container}>

                    <View style={{
                        margin: 40, alignItems: "center"
                    }}>
                        <Image source={require("../../../assets/code.png")} />
                    </View>

                    {/* SHARE ID  */}
                    <View style={{
                        flexDirection: "row",
                        backgroundColor: "#d8ffcf",
                        borderRadius: 10,
                        padding: 20,
                        alignItems: "center",
                        marginBottom: 20
                    }}>
                        <FontAwesome5 style={{
                            marginRight: 20
                        }} name="lightbulb" size={24} color="black" />
                        <Text style={{
                            fontFamily: "ProductSans",
                            marginRight: 30
                        }}>Enter the Room Id you got from your colleagues to join the table</Text>
                    </View>

                    <TextInput
                        label="Room Id"
                        value={localRoomId}
                        keyboardType="number-pad"
                        underlineColor="transparent"
                        theme={{ roundness: 20, colors: { primary: colors.accentPrimary } }}
                        style={styles.inputbox}
                        onChangeText={(text) => setLocalRoomID(text)}
                    />
                    <TextInput
                        label="Name"
                        value={name}
                        underlineColor="transparent"
                        theme={{ roundness: 20, colors: { primary: colors.accentPrimary } }}
                        style={{ ...styles.inputbox, marginTop: 20 }}
                        onChangeText={(text) => setName(text)}
                    />

                    <View style={{
                        marginTop: 20,
                        alignItems: "center"
                    }}>
                        <Button onPressFunction={() => enterId()}>Join Room</Button>
                    </View>
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
    inputbox: {
        paddingLeft: 10,
        backgroundColor: "#ddffd9",
        borderRadius: 20,
        fontFamily: "ProductSans",
    },
})

export default JoinTable;