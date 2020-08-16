import React, { useState, useEffect, useContext } from "react"
import { TextInput } from "react-native-paper";
import Button from '../../../components/Button';
import { CommonActions } from '@react-navigation/native';
import { apiUrl } from '../../../config/keys';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MaskedView from '@react-native-community/masked-view';

import { GlobalContext } from "../../../context/GlobalState";

import {
    View,
    Image,
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

    const { user, token, globalTableId, updateTable, updateRoom } = useContext(GlobalContext);

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);

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
            <Header isUser navigation={props.navigation}>Home</Header>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "position"}
                >
                    <View style={styles.container}>
                        {/* <MaskedView
                            style={{ height: 100, backgroundColor: "#eee" }}
                            maskElement={
                                <Image source={require('../../../assets/Untitled.png')} style={{ height: 100, width: 100 }} />
                            }
                        >
                            <View style={{ flex: 1 ,backgroundColor: "cyan"}}>
                                <BarCodeScanner
                                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                    style={{ height: 340, width: 340 }}
                                >
                                </BarCodeScanner>
                            </View>
                        </MaskedView> */}

                        {/* <View style={styles.qrBox} />
                        {scanned && <Button color={colors.accentPrimary} onPress={() => setScanned(false)}>Tap to Scan Again</Button>}
                        <Text style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            margin: 10
                        }}> OR</Text> */}

                        <View style={{
                            marginBottom: 10
                        }}>
                            <Text style={{
                                fontFamily: "ProductSansBold",
                                fontSize: 20
                            }}> Hi {user && user.name && user.name}</Text>
                            <Text style={{
                                color: "#333",
                                fontFamily: "ProductSans"
                            }}> Welcome Back</Text>
                        </View>

                        <View style={{
                            marginTop: 10
                        }}>
                            <Text style={{
                                fontFamily: "ProductSansBold",
                                fontSize: 20,
                                color: "#009c0a"
                            }}> Scan QR Code on Table</Text>
                            <View style={{
                                marginTop: 20,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <View style={{
                                    height: 330,
                                    width: 330,
                                    borderRadius: 20,
                                    backgroundColor: "#5effa7"
                                }} />
                            </View>

                            <TextInput
                                label="Table ID"
                                value={tableId}
                                underlineColor="transparent"
                                theme={{ roundness: 20, colors: { primary: colors.accentPrimary } }}
                                style={styles.inputbox}
                                onChangeText={(text) => setTableId(text)}
                            />

                            <Button style={{marginLeft: 20,marginTop: 20}} onPressFunction={newTable} >Proceed </Button>
                        </View>


                        <Text style={{
                            marginTop: 20,
                            fontFamily: "ProductSansBold",
                            fontSize: 20,
                            color: "#009c0a"
                        }}> Join a Table</Text>
                        <Button style={{marginLeft: 20,marginTop: 20}} onPressFunction={() => props.navigation.navigate('JoinTable')}>Join Table</Button>

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
        padding: 20,
        height: Dimensions.get("screen").height
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
    },
    inputbox: {
        marginHorizontal: 20,
        marginTop: 25,
        paddingLeft: 10,
        backgroundColor: "#ddffd9",
        borderRadius: 20,
        fontFamily: "ProductSans"
    },
})
export default HomeMain;