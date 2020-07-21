import React, {useState,useEffect,useContext} from "react"
import {Button,TextInput,Card} from "react-native-paper";
import socketIOClient from 'socket.io-client';

import {GlobalContext} from '../../../context/GlobalState';

import {
    AsyncStorage,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    FlatList,
    Dimensions
} from "react-native";
import Axios from 'axios';
import {apiUrl} from '../../../config/keys';
import Header from '../../../components/Header';
import { colors } from "../../../constants/constant";

//Initalizing client-socket instance
const socket =  socketIOClient(`${apiUrl}`);

const Menu = (props) => {

    const {token,gloablRoomId} = useContext(GlobalContext);
    const [menu,setMenu] = useState([]);
    const [permission,setPermission] = useState("");
    const [user,setUser] = useState({});
    
    //Each table has a seperate room identified by @tableId
    const [room,setRoom] = useState("");

    useEffect( () => {
    
        const getPermission = async () => {
            
            const userId = await AsyncStorage.getItem("userId");
            
            console.log(token,"token from Menu.js");
            //Fetching permission role for logged in user using token
            if(token) {
                fetch(`${apiUrl}/permission/get`, {
                    headers : {
                        "Authorization" : "Bearer "+token
                    }
                }).then((res) => res.json())
                    .then((data) => {
                        
                        //Setting user details 
                        setUser(data.user);

                        //Setting user permission
                        console.log(data.user.role,"logged in user");
                        setPermission(data.user.role);

                    }).catch((err) => {
                        console.log(err);
                    })
                }

            //Fetching permission role for guest user using userId
            else if(userId) {
                fetch(`${apiUrl}/permission/get`, {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json", 
                    },
                    body : JSON.stringify({
                        "id" : userId
                    })    
                }).then((res) => res.json())
                .then((data) => {
                    
                    //Setting user details
                    setUser(data.user);
                    console.log(data.user.role,"guest user");

                    //Setting user permissions
                    setPermission(data.user.role);
                })
            }
        
        }

        const getMenu = async () => {
            
            const roomId = gloablRoomId;
            
            console.log(gloablRoomId,"roomId");

            //Fetching menu for logged in user
            if(token) {
                fetch(`${apiUrl}/menu` , {
                headers : {
                  "Authorization" : "Bearer "+ token 
                }
                }).then((res) => res.json())
                .then((data) => {
                    
                    //Providing the rooms with unique id
                    setRoom(data._id);

                    //Initializing the counter
                    data.tableOf.menu.map((elem) => {
                        elem.count = 0;
                    })
                
                    //Setting the menu
                    setMenu(data.tableOf.menu);

                }).catch((err) => {
                    console.log(err);
                })    
            }
            
            //Fetching menu for guest user using roomId stored in async storage
            else if(roomId) {
                fetch(`${apiUrl}/menu/guest` , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json", 
                },
                body : JSON.stringify({
                    "roomId" : roomId
                })
                }).then((res) => res.json())
                .then((data) => {
                    //Providing the rooms with unique id
                    setRoom(data._id);

                    //Initializing the counter
                    data.tableOf.menu.map((elem) => {
                        elem.count = 0;
                    })

                    //Setting the menu
                    setMenu(data.tableOf.menu);

                }).catch((err) => {
                    console.log(err);
                })
            }
        
        }

        getPermission();
        getMenu();
    
    },[])

    //Emitting the joinRoom event to the server 
    //Event emitted @Server
    socket.emit("joinRoom" ,user.name,room);
    
    //Increasing the no of items
    const incrementCounter = (id,index) => {

        if(id === (menu[index]._id)) {
            let newMenu = [...menu];
            newMenu[index].count += 1;
            setMenu(newMenu);
            console.log(menu);

            //Emitting the counter(increment) change event @Sever
            socket.emit("countChange",menu);
        }
    }
    //Decreasing the no of items
    const decrementCounter = (id,index) => {

        if(id === menu[index]._id) {
            let newMenu = [...menu];
            if(newMenu[index].count > 0) {
                newMenu[index].count -= 1;
            }
            else {
                newMenu[index].count = 0;
            }
            setMenu(newMenu);

            //Emitting the counter(decrement) change event @Sever
            socket.emit("countChange",menu);
        }
    }

    //Placing order
    const orderPlaced = () => {
        fetch("${apiUrl}/orderplace", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json", 
            },
            body : JSON.stringify({
                "tableId" : room,
                "menu" : menu
            })
        }).then((res) => res.json())
        .then((data) => {
            if(data.error) {
                Alert.alert("Sorry, something went wrong");
            }
            else {
                Alert.alert("Order Placed successfully");
            }
        })
    }

    //Listening for the menuChange event from @Sever
    socket.on("menuChange",(menu) => {
        setMenu(menu);
    })

    const renderList = ((item,index) => {
        return (
            <Card 
                style={styles.myCard} 
                key = {item._id}
            >
                <View style = {styles.cardView}> 
                    <View>
                        <Text style = {styles.text}> {item.item}</Text>
                        <Text style = {styles.text}> {item.price}</Text>
                    </View>
                            <View style={styles.container}>

                            <TouchableOpacity
                                style={styles.operation}
                                onPress = {() => decrementCounter(item._id,index)}
                                disabled = {permission === "view" ? true : false}
                                
                            >
                                <Text style={{color: colors.back,fontSize: 20,fontWeight: "bold"}}> - </Text>
                            </TouchableOpacity>

                            <View style = {styles.counter}> 
                                <Text style={{textAlign: "center"}}> {menu[index].count} </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.operation}
                                onPress = {() => incrementCounter(item._id,index)}
                                disabled = {permission === "view" ? true : false}
                            >
                                <Text style={{color: colors.back,fontSize: 20,fontWeight: "bold"}}> + </Text>
                            </TouchableOpacity>

                        </View>
                </View>
            </Card>
        )
    })

    return (
        <View style = {{backgroundColor: colors.back,height: Dimensions.get("window").height -50}}>
            <Header>Menu</Header>
            <FlatList
                data = {menu}
                renderItem = {({item,index}) => {
                    return renderList(item,index) 
                }}
                keyExtractor = {(item) => item._id }
            >
            </FlatList>
            {permission === "admin" ? (
                <Button 
                    mode="contained"
                    theme = {{colors : {primary : colors.accentPrimary}}}
                    style={styles.button}
                    onPress = {() => orderPlaced()} >        
           
                    Give order
                
                </Button> ) : 
                    null
            }       
            
        </View>

    )
}


const styles = StyleSheet.create({
    myCard : {
        margin : 5
    },
    cardView : {
        flexDirection : "row",
        padding : 10,
        justifyContent : "space-around"        
    },
    text : {
        fontSize : 20,
        marginLeft : 10
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
    counter : {
        height : 20,
        width : 30,
        alignItems: "center"
    },
    container : {
        flexDirection : "row",
        justifyContent : "flex-end"
    },
    operation: {
        alignItems: "center",
        borderRadius: 40,
        backgroundColor: colors.accentPrimary,
        
        padding: 10
    }
})

export default Menu