import React from 'react'
import { FlatList, View, Dimensions, Modal, StyleSheet } from 'react-native'
import { ActivityIndicator, Text, Divider } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import socketIOClient from "socket.io-client";

import Header from '../../../components/Header';
import Button from '../../../components/Button';

import { colors } from '../../../constants/constant';
import { GlobalContext } from '../../../context/GlobalState';
import { apiUrl } from '../../../config/keys'

//Initalizing client-socket instance
const socket = socketIOClient(`${apiUrl}`);

const Checkout = ({ navigation }) => {
    const [visible, setVisible] = React.useState(false);
    const [orderId, setOrderId] = React.useState(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5));
    const [content, setContent] = React.useState(true)
    const [processing, setProcessing] = React.useState(false)

    const { order, globalTableId, user, restro, token } = React.useContext(GlobalContext)

    const OfflineContent = {
        title: "Offline",
        content: ['Step 1 : Lorem ipsum dolor sit amet ', 'Step 2 : Lorem ipsum dolor sit amet ', 'Step 3 : Lorem ipsum dolor sit amet ']
    }
    const OnlineContent = {
        title: "Online",
        content: ['Step 1 : Lorem ipsum dolor sit amet ', 'Step 2 : Lorem ipsum dolor sit amet ', 'Step 3 : Lorem ipsum dolor sit amet ']
    }

    const checkIfPaid = () => {

        setProcessing(true)
        const newDate = new Date();
        fetch(`${apiUrl}/orderplace`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "tableId": globalTableId,
                "orderId": orderId,
                "menu": order.menu,
                "name": restro.name,
                "address": restro.address,
                "date": newDate
            })
        }).then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    Alert.alert("Sorry, something went wrong");
                }
                else {
                    socket.emit("orderPlaced", { globalTableId, "menu": order.menu, "username": user.name, orderId, "restroId": restro._id });
                    socket.on("paid", (oID) => {
                        if (oID === orderId) {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [
                                        {
                                            name: 'OrderConfirmed',
                                        },
                                    ],
                                })
                            );
                        }
                    })
                }
            })
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent
                statusBarTranslucent
                visible={visible}
                onRequestClose={() => setVisible(!visible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{
                            fontSize: 20
                        }}>Instuctions for {content ? OfflineContent.title : OnlineContent.title} Payment</Text>
                        <View style={{
                            margin: 10
                        }}>
                            <Text style={{ margin: 5, fontSize: 15 }}>Step 2 : Lorem ipsum dolor sit amet  </Text>
                            <Divider />
                            <Text style={{ margin: 5, fontSize: 15 }}>Step 3 : Lorem ipsum dolor sit amet  </Text>
                            <Divider />
                        </View>

                        <Button
                            onPressFunction={() => {
                                setVisible(!visible);
                            }}
                        >
                            Close
                        </Button>
                    </View>
                </View>
            </Modal>
            <Header navigation={navigation} isBack>Checkout</Header>
            <View style={{ margin: 20, marginTop: 15 }}>
                <View style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                }}>
                    <View style={{ padding: 20, paddingBottom: 15 }}>
                        <Text style={{
                            fontSize: 20,
                            marginBottom: 10,
                            fontFamily: "ProductSansBold",
                        }}>Order</Text>
                        <View style={{
                            maxHeight: 300,
                        }}>
                            <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ flex: 1, color: "#00821a", fontFamily: "ProductSansBold" }}>Name</Text>
                                <Text style={{ flex: 1, color: "#00821a", fontFamily: "ProductSansBold" }}>Quantity</Text>
                                <Text style={{ flex: 1, color: "#00821a", fontFamily: "ProductSansBold" }}>Price</Text>
                                <Text style={{ flex: 1, color: "#00821a", fontFamily: "ProductSansBold" }}>Total Price</Text>
                            </View>
                            <FlatList
                                data={order.menu}
                                renderItem={({ item }) => (
                                    item.count ?
                                        <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Text style={{ flex: 1, fontFamily: "ProductSans" }}>{item.item}</Text>
                                            <Text style={{ flex: 1, fontFamily: "ProductSans" }}>{item.count}</Text>
                                            <Text style={{ flex: 1, fontFamily: "ProductSans" }}>₹{item.price}</Text>
                                            <Text style={{ flex: 1, fontFamily: "ProductSans" }}>₹{item.price * item.count}</Text>
                                        </View> : null
                                )}
                            />
                        </View>
                    </View>
                    <View style={{
                        height: 50,
                        borderBottomEndRadius: 20,
                        borderBottomLeftRadius: 20,
                        backgroundColor: "#2ce66d",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-around"
                    }}>
                        <Text style={{
                            fontFamily: "ProductSansBold",
                            color: "#fff",
                            fontSize: 22
                        }}>Total</Text>
                        <Text style={{
                            fontSize: 22,
                            textAlign: "right",
                            color: "#fff",
                            marginLeft: 10,
                            fontFamily: "ProductSansBold"
                        }}>₹ 300</Text>
                    </View>
                </View>

                <View style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 20,
                    marginTop: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                }}>
                    <Text style={{ fontSize: 20, fontFamily: "ProductSansBold", marginBottom: 15 }}>Pay for your Order</Text>
                    <Text style={{ color: "#555", fontFamily: "ProductSans" }}>Pay your Bill using one of the preffered methods</Text>

                    <View style={{
                        marginTop: 10, flexDirection: "row", justifyContent: "space-around", alignItems: "center"
                    }}>
                        <Button colorBack="#54cfff" onPressFunction={() => { setContent(true); setVisible(true) }}> Pay Offline</Button>
                        <Button colorBack="#ffaa54" onPressFunction={() => { setContent(false); setVisible(true) }}> Pay Online</Button>
                    </View>
                </View>

                <View style={{
                    backgroundColor: "white",
                    padding: 20,
                    marginTop: 20,
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                }}>
                    <Text style={{ fontSize: 20, fontFamily: "ProductSansBold", marginBottom: 15 }}>Confirm Order</Text>
                    <Text style={{ color: "#555", fontFamily: "ProductSans", marginBottom: 10 }}>Pay your Bill using one of the preffered methods</Text>
                    {
                        processing ?
                            <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: colors.accentPrimary, marginRight: 10, fontFamily: "ProductSans" }} >Processing</Text>
                                <ActivityIndicator animating={true} color={colors.accentPrimary} />
                            </View> :
                            <Button
                                onPressFunction={() => checkIfPaid()}
                            >
                                Confirm
                </Button>
                    }
                </View>

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.back,
        height: Dimensions.get('window').height
    },
    button: {
        margin: 10,
        borderRadius: 50,
        color: colors.back
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        backgroundColor: "#00000044",
        justifyContent: "center",
        alignItems: "center",
    },
})
export default Checkout
