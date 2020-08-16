import React,{useContext} from 'react';
import { StyleSheet, Text, View ,Image,Dimensions,AsyncStorage,TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Button} from 'react-native-paper'
import Header from '../../../components/Header';
import { MaterialCommunityIcons,FontAwesome,Feather,Ionicons} from '@expo/vector-icons'

//Context
import { GlobalContext } from '../../../context/GlobalState';
import { colors } from '../../../constants/constant';

const width = Dimensions.get("window").width;
const ViewProfile = ({navigation}) =>{
    
    const { user } = useContext(GlobalContext);
    const {_id,name,email,phone,password} = user;

    const logout = async () => {
        const token = await AsyncStorage.removeItem("token")
        const user = await AsyncStorage.removeItem("user")
        if (!token) {
            navigation.replace("Login");
        }
    }

  return (
      <View style={styles.root}>
        {/* <LinearGradient
         colors={["#77f298","#00de5c"]}
         style={{height:"20%"}}
         >
             
        </LinearGradient> */}
        <Header> View Profile </Header>
        <View style={{alignItems:"center"}}>
            <Image
                style={{width:140,height:140,borderRadius:140/2,marginTop:50}}
                source={require("../../../assets/person.jpg")}
            /> 
        </View>
        <View style={{alignItems:"center",margin:15}}>
             <Text style={styles.name}> {name} </Text>
        </View>
        
        <TouchableOpacity onPress={() => {
            navigation.navigate('EditProfile',{
                name,email,phone
            })
        }}>
            <View style = {styles.cardContainer}>
                <View style={styles.mycard}>
                    <View style={styles.cardContent}>
                        <FontAwesome name ="user-circle" style= {styles.icon} />
                        <Text style={styles.mytext}>Account Details</Text>
                        <Ionicons name="ios-arrow-forward" style={styles.arrow} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
            navigation.navigate('RecentOrders')
        }}>
            <View style={styles.mycard}>
                <View style={styles.cardContent}>
                    <MaterialCommunityIcons name="food-variant" style = {styles.icon} />
                    <Text style={styles.mytext}>Order History</Text>
                    <Ionicons name="ios-arrow-forward" style={styles.arrow} />
                </View>
            </View>
        </TouchableOpacity>
            
            
            <TouchableOpacity onPress={() => {
                navigation.navigate('Contact')}}>

                <View style={styles.mycard} onPress={() => {
                    navigation.navigate('Contact')}}>
                    <View style={styles.cardContent}>
                        <Feather name="phone-call" style = {styles.icon} />
                        <Text style={styles.mytext}>Contact Us</Text>
                        <Ionicons name="ios-arrow-forward" style={styles.arrow} />
                    </View>
                </View>
            </TouchableOpacity>

        <Button 
            icon="delete"
            mode="contained"
            style = {styles.button}
            onPress={() => logout()}>
            Logout           
        </Button>

      </View>
  )
}



const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor : "#ffffff"
    },
    cardContainer : {
        marginTop : 30
    },
    name : {
        fontSize : "DMSansRegular",
        fontSize : 24,
        letterSpacing :1
    },  
    mycard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding:10
    },
    icon : {
        fontSize: 32,
        paddingRight : 10,
        fontWeight : "bold",
        color : "#00de5c"  
    },
    arrow : {
        position : "absolute",
        right : 20,
        paddingTop : 10,
        fontSize : 30,
        color : "#c0c0c0"
    },
    button : {
        backgroundColor : colors.accentPrimary,
        color : colors.back,
        width : width*0.85,
        marginLeft : width*0.08,
        marginTop : 50,
        borderRadius : 10,
        fontFamily : "DMSans"
    },
    mytext:{
        fontSize:18,
        marginTop:3,
        fontFamily : "DMSansRegular",
        marginLeft:5
    }
})

export default ViewProfile