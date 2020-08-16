import React,{useContext, useEffect,useState} from 'react';
import { StyleSheet, Text, View ,Image,Dimensions,KeyboardAvoidingView,ImageBackground,ScrollView} from 'react-native';
import Header from '../../../components/Header';
import {Title,Card,Button} from 'react-native-paper'


//Context
import { GlobalContext } from '../../../context/GlobalState';
import { colors } from '../../../constants/constant';
import {apiUrl} from "../../../config/keys";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
var totalPrice = [];

const RecentOrders = (props) => {
    const { token} = useContext(
        GlobalContext
    );
    
    const [order,setOrder] = useState([]);
    
    useEffect(() => {
        fetch(`${apiUrl}/menu/getrecentorders`,{
            headers : {
                Authorization : "Bearer "+token
            }
        }).then((res) => res.json())
        .then((data) => {
            setOrder(data);
        })
    },[])
        

    console.log(order,"recent order");
    return (
        <ScrollView>
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
                <Header>Recent Orders</Header>
                {order.map((recentorder) => (
                <View>
                    <ImageBackground style = {styles.image} source = {require("../../../assets/order1.jpg")}>
                    <View style = {styles.titleview}>
                        <Text style = {styles.title}>{recentorder.date}</Text>
                        <Text style = {styles.title}>
                            {recentorder.restroDetails.name},{recentorder.restroDetails.address}
                        </Text>
                    </View>
                </ImageBackground>
                {recentorder.menu.map((menu) => (
                    <View>
                        <View style = {styles.cardContainer}>
                            <View style={styles.mycard}>
                                <View style={styles.cardContent}>
                                    <View style = {styles.countbox}><Text style={styles.count}>{menu.count}</Text></View>
                                    <Text style={styles.mytext}>{menu.item}</Text>
                                    <Text style={styles.price}>Rs {menu.price}</Text>   
                                    <Text style = {styles.invisible}>{totalPrice.push(menu.price*menu.count)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
                    
                    <View style = {styles.totalview}>
                        <Text style = {{...styles.mytext,fontWeight : "bold"}}>
                            Total : Rs {totalPrice.reduce((a,b) => {
                                return (a+b)
                            })}
                        </Text>
                    </View>
                </View>
                ))}
                
            </KeyboardAvoidingView>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#ffffff"
    },
    image : {
        height : height*0.2,
        opacity : 0.4
    },
    titleview : {
        flexDirection : "column",
        marginTop : height *0.1
    },
    title : {
        fontFamily : "DMSansBold",
        fontSize : 20,
        letterSpacing : 1,
        textAlign : "center"
    },
    cardContainer : {
        marginTop : 10
    },
    mycard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding:10
    },
    mytext:{
        fontSize:18,
        marginTop:3,
        fontFamily : "PTSans",
        marginLeft:10,
        letterSpacing : 1
    },
    countbox : {
        borderColor : "#00de5c",
        borderWidth : 2,
        width : 30,
        display : "flex",
        textAlign : "center",
        borderRadius : 5,
        paddingLeft : 6
    },
    count : {
        fontSize: 20,
        paddingRight : 10,
        fontWeight : "bold",
        color : "#00de5c"  
    },
    price : {
        position : "absolute",
        right : 20,
        paddingTop : 10,
        fontSize : 20
    },
    invisible : {
        color : "#ffffff"
    },
    totalview : {
        flexDirection : "row",
        justifyContent : "flex-end",
        marginRight : 10
    }
})
export default RecentOrders