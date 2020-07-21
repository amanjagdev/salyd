import React, { useState, useEffect, useContext } from "react"
import { Button, TextInput } from "react-native-paper";
import { CommonActions } from '@react-navigation/native';
import { apiUrl } from '../../../config/keys';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { GlobalContext } from "../../../context/GlobalState";

import {
    View,
    Text,
    ScrollView,
    AsyncStorage,
    StyleSheet,
    Alert,
    Dimensions,
    Platform,
    KeyboardAvoidingView
} from "react-native";

import Header from '../../../components/Header';
import { colors } from "../../../constants/constant";
import Axios from "axios";

const HomeMain = (props) => {

    const [tableId, setTableId] = useState(null);
    const [localRoomId, setLocalRoomID] = useState(null);

    const { token, globalTableId, updateTable, updateRoom } = useContext(GlobalContext);

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        console.log("SCANEED :  >>>>>> ", scanned)
        setScanned(true);
        console.log("SCANEED :  >>>>>> ", scanned)
        setTableId(data.toString());
        // newTable()
    };

    useEffect(() => {
        if (globalTableId)
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Table'
                        },
                    ],
                })
            );
    }, [globalTableId])

    const newTable = async () => {
        Axios({
            url: `${apiUrl}/newtable`,
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            data: { tableId }
        })
            .then(async res => {
                if (res.data.error) {
                    Alert.alert("Sorry, Incorrect Table Id");
                }
                else {
                    updateTable(res.data._id);
                    updateRoom(res.data.roomId);
                    console.log(res.data.roomId)
                    await AsyncStorage.setItem('tableId', res.data._id.toString());
                    await AsyncStorage.setItem('roomId', res.data.roomId.toString());
                    Alert.alert("Table Created Successfully");
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'Table',
                                    //TODO: remove this
                                    params: { roomId: res.data.roomId }
                                },
                            ],
                        })
                    );
                }
            })
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <React.Fragment>
            <Header>Home</Header>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "position"}
                >
                    <View style={styles.container}>

                        <View style={{ alignItems: "center" }}>
                            <BarCodeScanner
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={{ height: 340, width: 340, alignItems: "center", justifyContent: "space-around" }}
                            >
                                <View style={styles.qrBox} />
                                {scanned && <Button color={colors.accentPrimary} onPress={() => setScanned(false)}>Tap to Scan Again</Button>}
                            </BarCodeScanner>
                        </View>

                        <Text style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            margin: 10
                        }}> OR</Text>

                        <Text style={{
                            textAlign: "center",
                            margin: 10
                        }}> Please enter the tableId mentioned below the QR code placed on your table</Text>

                        <TextInput
                            label="Table ID"
                            mode="outlined"
                            value={tableId}
                            style={{ margin: 15 }}
                            theme={{ roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                            onChangeText={(text) => setTableId(text)}
                        />

                        <Button
                            mode="contained"
                            color={colors.accentPrimary}
                            style={styles.button}
                            onPress={() => newTable()}
                        >
                            Proceed
                </Button>

                        <Button
                            mode="contained"
                            color={colors.accentPrimary}
                            style={styles.button}
                            onPress={() => props.navigation.navigate('JoinTable')}
                        >
                            Join Table
                </Button>

                    </View>
                </KeyboardAvoidingView >
            </ScrollView>
        </React.Fragment>
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
        // height: 4000
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
    qrBox: {
        height: 200,
        width: 200,
        borderRadius: 20,
        borderColor: colors.accentPrimary,
        borderWidth: 3
    }
})
export default HomeMain;