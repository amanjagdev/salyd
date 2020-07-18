import React, {useState,useEffect} from "react"
import {Button,TextInput,Card} from "react-native-paper";
import socketIOClient from 'socket.io-client';

import {
    AsyncStorage,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    FlatList
} from "react-native"

//Initalizing client-socket instance
const socket =  socketIOClient("http://0d191b913821.ngrok.io");

const Menu = (props) => {

    const [menu,setMenu] = useState([]);
    const [permission,setPermission] = useState("");
    const [user,setUser] = useState({});
    
    //Each table has a seperate room identified by @tableId
    const [room,setRoom] = useState("");

    useEffect( () => {
    
        const getPermission = async () => {
            
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("userId");
            const roomId = await AsyncStorage.getItem("roomId");            
            
            console.log(token,"token from Menu.js");
            //Fetching permission role for logged in user using token
            if(token) {
                fetch("http://0d191b913821.ngrok.io/permission/get", {
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
                fetch("http://0d191b913821.ngrok.io/permission/get", {
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
            
            const token = await AsyncStorage.getItem("token");
            const roomId = await AsyncStorage.getItem("roomId");
            
            console.log(roomId,"roomId");

            //Fetching menu for logged in user
            if(token) {
                fetch("http://0d191b913821.ngrok.io/menu" , {
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
                fetch("http://0d191b913821.ngrok.io/menu/guest" , {
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

    console.log(room,"tableId");

      //Emitting the joinRoom event to the server 
    //Event emitted @Server
    socket.emit("joinRoom" ,user.name,room);

    const clearToken = async (props) => {
        const roomId = await AsyncStorage.removeItem("roomId");
        const tableId = await AsyncStorage.removeItem("tableId");
        const token = await AsyncStorage.removeItem("token");
        const userId = await AsyncStorage.removeItem("userId");

        if(!tableId) {
            props.navigation.replace("home");
        }
        if(!roomId) {
            props.navigation.replace("home");
        }
        if(!token) {
            props.navigation.replace("home");
        }
        if(!userId) {
            props.navigation.replace("home");
        }
    }
    
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

    // // Alert popup for submitting menu
    // const alertPopup = () => {
    //     console.log("alert alert");
    //     Alert.alert(
    //         "Place your order"
    //         [
    //             {
    //             text: "Cancel",
    //             onPress: () => console.log("Cancel Pressed"),
    //             style: "cancel"
    //             },
    //             { text: "OK", onPress: () => orderPlaced() }
    //         ],
    //         { cancelable: false }
    //     );
    // }

    //Placing order
    const orderPlaced = () => {
        fetch("http://0d191b913821.ngrok.io/orderplace", {
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
                                <Text> - </Text>
                            </TouchableOpacity>

                            <View style = {styles.counter}> 
                                <Text> {menu[index].count} </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.operation}
                                onPress = {() => incrementCounter(item._id,index)}
                                disabled = {permission === "view" ? true : false}
                            >
                                <Text> + </Text>
                            </TouchableOpacity>

                        </View>
                </View>
            </Card>
        )
    })

    return (
        <View style = {{flex : 1}}>
            <Text> Menu</Text>
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
                    theme = {{colors : {primary : "#0bb016"}}}
                    style={styles.button}
                    onPress = {() => orderPlaced()} >        
           
                    Give order
                
                </Button> ) : 
                    null
            }

            <Button 
                mode="contained"
                theme = {{colors : {primary : "#0bb016"}}}
                style={styles.button}
                onPress = {() => clearToken(props)} >        
            
                Proceed
            </Button>
        
            
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
    button : {
        fontSize : 18,
        marginLeft : 18,
        marginRight : 18,
        marginTop : 18
    },
    counter : {
        height : 20,
        width : 50
    },
    container : {
        flexDirection : "row",
        justifyContent : "flex-end"
    },
    operation: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    }
})

export default Menu