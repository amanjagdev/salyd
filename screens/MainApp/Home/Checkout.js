import React from 'react'
import { FlatList, View, Dimensions, Modal, StyleSheet } from 'react-native'
import { ActivityIndicator, Text, Button, Divider } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

import Header from '../../../components/Header';
import { colors } from '../../../constants/constant';

const Checkout = ({ navigation }) => {
    const [visible, setVisible] = React.useState(false);
    const [content, setContent] = React.useState(true)
    const [processing, setProcessing] = React.useState(false)

    const OfflineContent = {
        title: "Offline",
        content: ['Step 1 : Lorem ipsum dolor sit amet ', 'Step 2 : Lorem ipsum dolor sit amet ', 'Step 3 : Lorem ipsum dolor sit amet ']
    }
    const OnlineContent = {
        title: "Online",
        content: ['Step 1 : Lorem ipsum dolor sit amet ', 'Step 2 : Lorem ipsum dolor sit amet ', 'Step 3 : Lorem ipsum dolor sit amet ']
    }
    const order = {
        orderID: "urwir93234",
        menu: [
            {
                item: "Pav Bhaji",
                qty: 1,
                price: 43,
            },
            {
                item: "Bhaji",
                qty: 3,
                price: 430,
            },
            {
                item: "Pizza",
                qty: 5,
                price: 483,
            },
            {
                item: "Pav Bhaji",
                qty: 1,
                price: 43,
            },
            {
                item: "Bhaji",
                qty: 3,
                price: 430,
            },
            {
                item: "Pizza",
                qty: 5,
                price: 483,
            },
            {
                item: "Pav Bhaji",
                qty: 1,
                price: 43,
            },
            {
                item: "Bhaji",
                qty: 3,
                price: 430,
            },
            {
                item: "Pizza",
                qty: 5,
                price: 483,
            },
            {
                item: "Pav Bhaji",
                qty: 1,
                price: 43,
            },
            {
                item: "Bhaji",
                qty: 3,
                price: 430,
            },
            {
                item: "Pizza",
                qty: 5,
                price: 483,
            },
            {
                item: "Pav Bhaji",
                qty: 1,
                price: 43,
            },
            {
                item: "Bhaji",
                qty: 3,
                price: 430,
            },
            {
                item: "Pizza",
                qty: 5,
                price: 483,
            },
        ]
    }

    const checkIfPaid = () => {
        setProcessing(true)
        setTimeout(() => {
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
        }, 3000);
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
                            mode="contained"
                            color={colors.accentPrimary}
                            style={{ ...styles.button, ...styles.outlined }}
                            onPress={() => {
                                setVisible(!visible);
                            }}
                        >
                            Close
                        </Button>
                    </View>
                </View>
            </Modal>
            <Header>Checkout</Header>
            <View style={{ margin: 15, marginTop: 0 }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Your Order : {order.orderID}</Text>
                    <View style={{
                        maxHeight: 300,
                    }}>
                        <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ flex: 1, fontWeight: "bold" }}>Name</Text>
                            <Text style={{ flex: 1, fontWeight: "bold" }}>Quantity</Text>
                            <Text style={{ flex: 1, fontWeight: "bold" }}>Price</Text>
                            <Text style={{ flex: 1, fontWeight: "bold" }}>Total Price</Text>
                        </View>
                        <FlatList
                            data={order.menu}
                            renderItem={({ item }) => (
                                <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ flex: 1 }}>{item.item}</Text>
                                    <Text style={{ flex: 1 }}>{item.qty}</Text>
                                    <Text style={{ flex: 1 }}>{item.price}</Text>
                                    <Text style={{ flex: 1 }}>{item.price * item.qty}</Text>
                                </View>
                            )}
                        />
                    </View>
                </View>

                <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 15, marginBottom: 0 }}>Pay for your Order</Text>
                <Text style={{ color: "#555" }}>Pay your Bill using one of the preffered methods</Text>

                <View style={{
                    marginTop: 10, flexDirection: "row", justifyContent: "space-around", alignItems: "center"
                }}>
                    <Button
                        mode="contained"
                        color={colors.accentPrimary}
                        style={{ ...styles.button }}
                        onPress={() => { setContent(true); setVisible(true) }}
                    >
                        Pay Offline
                    </Button>

                    <Button
                        mode="contained"
                        color={colors.accentPrimary}
                        style={{ ...styles.button }}
                        onPress={() => { setContent(false); setVisible(true) }}
                    >
                        Pay Online
                    </Button>
                </View>

                <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 15, marginBottom: 0 }}>Confirm Order</Text>
                <Text style={{ color: "#555" }}>Pay your Bill using one of the preffered methods</Text>
                {
                    processing ?
                        <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: colors.accentPrimary, marginRight: 10 }} >Processing</Text>
                            <ActivityIndicator animating={true} color={colors.accentPrimary} />
                        </View> :
                        <Button
                            mode="contained"
                            color={colors.accentPrimary}
                            style={{ ...styles.button, ...styles.outlined }}
                            onPress={() => checkIfPaid()}
                        >
                            Confirm
                </Button>
                }

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
    outlined: {
        borderColor: colors.back,
        borderWidth: 1
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
