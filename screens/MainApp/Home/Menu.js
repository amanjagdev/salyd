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
import {LinearGradient} from 'expo-linear-gradient'
import Ionicons from "react-native-vector-icons/Ionicons";

//Initalizing client-socket instance
const socket =  socketIOClient(`${apiUrl}`);

const Menu = (props) => {

    const {token,globalRoomId} = useContext(GlobalContext);
    const [menu,setMenu] = useState([]);
    const [permission,setPermission] = useState("");
    const [user,setUser] = useState({});
    const [search,setSearch] = useState("");
    const [data_temp,setdata_temp] = useState([]);
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
                    setRoom(data._id);

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
                    setRoom(data._id);

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
    socket.emit("joinRoom" ,user.name,room);
    
    //Increasing the no of items
    const incrementCounter = (id,index) => {

        if(id === (menu[index]._id)) {
            let newMenu = [...menu];
            newMenu[index].count += 1;
            setMenu(newMenu);

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
            <LinearGradient 
                colors={['#009245', colors.accentPrimary]}
                start={{x:0, y:1}} end={{x:1, y:0}}
                style={styles.item}
            >
            
            <View style={styles.content}>
                <Text style={styles.name}>{item.item}</Text>
                    <View style={styles.price_container}>
                        
                        <View style={styles.price}>
                            <Text style={styles.textPrice}>Rs {item.price}</Text>
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
            </View>

        </LinearGradient>
        )
    })

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

            <View style={styles.section}>

              <TextInput 
                placeholder="Search.."
                style={{ flex:1, marginLeft:10}}
                value={search}
                onChangeText={(text)=> _search(text) }
              />

              <TouchableOpacity
                onPress={()=> _search("") }
                style={{paddingHorizontal:10}}>
                    <Ionicons 
                        name="ios-close"
                        color="gray"
                        size={20}
                    />

              </TouchableOpacity>

            </View>

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
        flex:1,
        paddingVertical:10,
        paddingHorizontal:10,
        flexDirection:'row',
        borderRadius:10
        // backgroundColor : colors.accentPrimary
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
        color:'white',
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
        backgroundColor:'white',
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:20
    },
    textPrice: {
        color:'green',
        fontWeight:'bold',
        fontSize : 18
    },
    counterContainer : {
        flexDirection:'row'
    },
    counter : {
        backgroundColor : "white",
        paddingVertical : 8,
        paddingHorizontal : 20,
        borderRadius : 10
    },
    main_count : {
          color : "white",
          paddingLeft : 5,
          paddingRight : 5,
          paddingTop : 8
    },
    textCounter : {
          color : "green",
          fontWeight : "bold"
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