import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';
import { Card } from 'react-native-paper'
import Header from '../../../components/Header';


//Context
import { GlobalContext } from '../../../context/GlobalState';
import { apiUrl } from "../../../config/keys";
import { colors } from '../../../constants/constant';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
var totalPrice = [];

const randomNum = () => {
    console.log
};

const RecentOrders = (props) => {
    const { token } = useContext(GlobalContext);

    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/menu/getrecentorders`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => res.json())
            .then((data) => {
                setOrder(data);
            })
    }, [])


    console.log(order, "recent order");
    return (
        <SafeAreaView>
            <Header navigation={props.navigation} isBack>Recent Orders</Header>
            <ScrollView style={styles.container}>
                {order.map((recentorder) => (
                    <View style={{
                        margin: 20,
                        backgroundColor: "#2ca062",
                        borderRadius: 20,
                        padding: 20,
                    }}>
                        <View style={{
                            marginBottom: 15
                        }}>

                            <Text style={{
                                color: "#fff",
                                fontFamily: "ProductSansBold"
                            }}>{recentorder.restroDetails.name}</Text>
                            <Text style={{
                                color: "#fff",
                                fontFamily: "ProductSansBold"
                            }}>{recentorder.restroDetails.address}</Text>
                            <Text style={{
                                marginTop: 5,
                                marginBottom: 5,
                                color: "#eee",
                                fontFamily: "ProductSans"
                            }}>{recentorder.date.substr(11, 5)} {recentorder.date.substr(0, 10)}</Text>
                            <View style={{
                                flexDirection: "row",
                                marginTop: 5
                            }}>
                                <View style={{
                                    backgroundColor: "#fff",
                                    width: 80,
                                    height: 3,
                                    borderRadius: 20,
                                }} />
                                <View style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 20,
                                    marginLeft: 10,
                                    width: 20,
                                    height: 3
                                }} />
                            </View>
                        </View>

                        {/* RECENT ORDER  */}
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Image style={{
                                    height: 100,
                                    width: 100
                                }} source={require(`../../../assets/vectors/${4}.png`)} />
                                {/* }} source={require(`../../../assets/vectors/${Math.floor(Math.random()*2 + 2).toString()}.png`)} /> */}
                            </View>

                            <View style={{
                                flex: 2,
                            }}>
                                {recentorder.menu.map((menu) => (
                                    <View style={{
                                        margin: 10,
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}>
                                        <View style={{
                                            flex: 1
                                        }}>
                                            <View style={{
                                                width: 30,
                                                padding: 4,
                                                alignItems: "center",
                                                borderRadius: 100,
                                                borderColor: "#fff",
                                                borderWidth: 1
                                            }} ><Text style={{ color: "#fff", }}>{menu.count}</Text></View>
                                        </View>
                                        <Text style={{ flex: 2, fontFamily: "ProductSansBold", color: "#fff", }}>{menu.item}</Text>
                                        <Text style={{ flex: 1, textAlign: "right", fontFamily: "ProductSansBold", color: "#fff", }}>₹ {menu.price}</Text>
                                        <Text style={styles.invisible}>{totalPrice.push(menu.price * menu.count)}</Text>
                                    </View>
                                ))}
                            </View>


                        </View>



                        <View style={{
                            paddingTop: 10,
                            paddingRight: 15,
                        }}>
                            <Text style={{
                                fontFamily: "ProductSansBold",
                                fontSize: 20,
                                color: "#66ffa3",
                                textAlign: "right"
                            }}>
                                ₹ {totalPrice.reduce((a, b) => {
                                return (a + b)
                            })}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        height: Dimensions.get("screen").height
    },
    image: {
        height: height * 0.2,
        opacity: 0.4
    },
    titleview: {
    },
    invisible: {
        color: "transparent"
    },
})
export default RecentOrders