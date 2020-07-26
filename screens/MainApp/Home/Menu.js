import React, {useState,useEffect,useContext} from "react"
import {Button,TextInput,Searchbar } from "react-native-paper";
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
import { colors, colorsOld } from "../../../constants/constant";
import {LinearGradient} from 'expo-linear-gradient'
import Ionicons from "react-native-vector-icons/Ionicons";

//Initalizing client-socket instance
const socket =  socketIOClient(`${apiUrl}`);

const Menu = (props) => {

    const {token,globalRoomId,globalTableId} = useContext(GlobalContext);
    const [menu,setMenu] = useState([]);
    const [permission,setPermission] = useState("");
    const [user,setUser] = useState({});
    const [search,setSearch] = useState("");
    const [data_temp,setdata_temp] = useState([]);

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
            
            const roomId = globalRoomId;
            
            console.log(roomId,"roomId");

            //Fetching menu for logged in user
            if(token) {
                fetch(`${apiUrl}/menu` , {
                headers : {
                  "Authorization" : "Bearer "+ token 
                }
                }).then((res) => res.json())
                .then((data) => {
                    
                    //Providing the rooms with unique id
                    
                    socket.emit("joinRoom" ,user.name,globalTableId);

                    //Initializing the counter
                    data.tableOf.menu.map((elem) => {
                        elem.count = 0;
                    })
                
                    //Setting the menu
                    setMenu(data.tableOf.menu);
                    setdata_temp(data.tableOf.menu);

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
                    socket.emit("joinRoom" ,user.name,globalTableId);
                    //Initializing the counter
                    data.tableOf.menu.map((elem) => {
                        elem.count = 0;
                    })

                    //Setting the menu
                    setMenu(data.tableOf.menu);
                    setdata_temp(data.tableOf.menu);

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
    
    //Increasing the no of items
    const incrementCounter = (id,index) => {

        if(id === (menu[index]._id)) {
            let newMenu = [...menu];
            newMenu[index].count += 1;
            setMenu(newMenu);

            //Emitting the counter(increment) change event @Sever
            socket.emit("countChange",menu,globalTableId);
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
            socket.emit("countChange",menu,globalTableId);
        }
    }

    //Placing order
    const orderPlaced = () => {
        // fetch("${apiUrl}/orderplace", {
        //     method : "POST",
        //     headers : {
        //         "Content-Type" : "application/json", 
        //     },
        //     body : JSON.stringify({
        //         "tableId" : room,
        //         "menu" : menu
        //     })
        // }).then((res) => res.json())
        // .then((data) => {
        //     if(data.error) {
        //         Alert.alert("Sorry, something went wrong");
        //     }
        //     else {
        //         Alert.alert("Order Placed successfully");
        //     }
        // })
        socket.emit('orderPlaced',"Hi");
    }

    //Listening for the menuChange event from @Sever
    socket.on("menuChange",(menu) => {
        setMenu(menu);
    })

    const renderList = ((item,index) => (
            <View
                style={styles.item}
            >
            
                <View style={styles.content}>
                        <Text style={styles.name}>{item.item}</Text>
                        <Text style={styles.desc}>Lorem ipsum, quos</Text>
                            
                        <View style={styles.price}>
                            <Text style={styles.textPrice}>₹ {item.price}</Text>
                        </View>
                </View>
                <View style = {styles.counterContainer}>
                        <TouchableOpacity
                            onPress = {() => decrementCounter(item._id,index)}
                            // disabled = {permission === "view" ? true : false}
                        >
                            <View style = {styles.counter}>
                                <Text style = {styles.textCounter}>-</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style = {styles.main_count}> {menu[index].count} </Text>

                        <TouchableOpacity
                            onPress = {() => incrementCounter(item._id,index)}
                            // disabled = {permission === "view" ? true : false}    
                        >
                            <View style = {styles.counter}>
                                <Text style = {styles.textCounter}>+</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                  
            </View>
        ));

    const _search = (text) => {
        let data = [];
        data_temp.map(function(value){
          if(value.item.indexOf(text) > -1){
            data.push(value);
          }
        });
  
        setMenu(data);
        setSearch(text);
    }

    ItemSeparatorComponent = () => {
        return(
          <View 
            style={{
              height:10
            }}
          />
        )
      }

    return (
        <View style = {styles.container}>
            <Header>Menu</Header>

            <Searchbar
            style={{
                margin: 15,
                borderRadius: 40
            }}
            placeholder="Search"
            onChangeText={_search}
            value={search}
            />

            <View style={styles.flatList}>
                
                <FlatList
                    data = {menu}
                    renderItem = {({item,index}) => {
                        return renderList(item,index) 
                    }}
                    keyExtractor = {(item) => item._id }
                    ItemSeparatorComponent={() =>  ItemSeparatorComponent()}
                    showsVerticalScrollIndicator={true}
                >
                </FlatList>

            </View>

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
    container: {
        flex:1,
        backgroundColor:'white',
        paddingBottom:5
      },
    flatList: {
        flex:1,
        marginTop:10
    },
    item: {
        justifyContent: "space-around",
        alignItems: "center",
        margin:10,
        marginTop: 5,
        marginBottom: 7,
        padding:10,
        flexDirection:'row',
        backgroundColor: colors.back,
        borderRadius: 10,
        padding: 10,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5
    },
    image_container: {
        width: 90,
        height: 90
    },
    image: {
        width:'100%',
        height:'100%',
        borderWidth:5,
        borderColor:'white',
        borderRadius:10
    },
    content: {
        flex:1,
        justifyContent:'center',
        paddingHorizontal:10
    },
    name: {
        color:colors.accentPrimary,
        fontWeight:'bold',
        fontSize:18
    },
    button: {
        width:30,
        height:30,
        backgroundColor:'white',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    },
    price_container: {
        flexDirection:'row',
        marginTop:10,
        justifyContent : "space-between"
    },
    price: {
        paddingVertical:10,
        borderRadius:20
    },
    textPrice: {
        color: colors.accentPrimary,
        fontWeight:'bold',
        fontSize : 13
    },
    counterContainer : {
        flexDirection:'row',
        marginRight: 20
    },
    counter : {
        backgroundColor : colors.accentPrimary,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius : 50
    },
    main_count : {
          color : colors.text,
          paddingLeft : 5,
          paddingRight : 5,
          paddingTop : 8
    },
    textCounter : {
          color : colors.back,
          fontWeight : "bold",
          fontSize: 14
    },
    section: {
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:100,
        backgroundColor:'#f2f2f2'
    },
    button: {
        margin: 10,
        borderRadius: 50,
        marginBottom: 20,
        color: colors.back
    },

})

export default Menu