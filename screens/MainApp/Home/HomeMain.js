import React, { useState, useEffect, useContext } from "react"
import { TextInput, ActivityIndicator } from "react-native-paper";
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
    const [submitting, isSubmitting] = useState(false);

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
        isSubmitting(true)
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
                    isSubmitting(false)
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
            }).catch(err => {
                isSubmitting(false);
                console.log(err)
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
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "position"}
                >
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

                        <Text style={{
                            fontFamily: "ProductSansBold",
                            fontSize: 20,
                            color: "#009c0a"
                        }}> Scan QR Code on Table</Text>
                        <View style={{
                            marginTop: 0,
                            margin: 20
                        }}>
                            <View style={{
                                alignItems: "center",
                                marginTop: 20,
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
                            {
                                submitting ?
                                    <View style={{
                                        marginTop : 20,alignItems: "flex-start",marginLeft: 10,marginBottom: 15
                                    }}>
                                        <ActivityIndicator color={colors.accentPrimary} />
                                    </View> :
                                    <Button mystyle={{ marginTop: 20 }} onPressFunction={newTable} >Proceed </Button>
                            }
                        </View>


                        <Text style={{
                            fontFamily: "ProductSansBold",
                            fontSize: 20,
                            color: "#009c0a"
                        }}> Join a Table</Text>
                        <Text style={{
                            fontFamily: "ProductSans",
                            marginLeft: 20,
                            marginTop: 20,
                        }}> You can just enter a code generated by someone else</Text>
                        <Button mystyle={{ marginLeft: 20, marginTop: 10 }} onPressFunction={() => props.navigation.navigate('JoinTable')}>Join Table</Button>

                </KeyboardAvoidingView >
            </ScrollView>
            </View>
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
        flex : 1,
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
        marginTop: 25,
        backgroundColor: "#ddffd9",
        borderRadius: 20,
        fontFamily: "ProductSans"
    },
})
export default HomeMain;