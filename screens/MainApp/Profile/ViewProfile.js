import React,{useContext} from 'react';
import { StyleSheet, Text, View ,Image,Linking,Platform,Alert,Dimensions,AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Title,Card,Button} from 'react-native-paper'
import { MaterialIcons,Entypo,AntDesign,Ionicons} from '@expo/vector-icons'

//Context
import { GlobalContext } from '../../../context/GlobalState';
import { colors } from '../../../constants/constant';

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
        <LinearGradient
         colors={["#77f298","#00de5c"]}
         style={{height:"20%"}}
         >
             
         </LinearGradient>
         <View style={{alignItems:"center"}}>
             <Image
            style={{width:140,height:140,borderRadius:140/2,marginTop:-50}}
            source={require("../../../assets/carousel0.png")}
            /> 
         </View>
         <View style={{alignItems:"center",margin:15}}>
             <Title>Hey {name} !</Title>
             <Text style={{fontSize:15,marginTop : 20}}>Your Recent Orders :</Text>
         </View>
         <Card style={styles.mycard} onPress={()=>{
             console.log("ok");
         }}>
            <View style={styles.cardContent}>
              <AntDesign name="email" size={32} color="#006aff" />
              <Text style={styles.mytext}>OrderId : 12456</Text>
            </View>
         </Card>
         <Card style={styles.mycard} onPress={()=>openDial()}>
            <View style={styles.cardContent}>
              <Ionicons name="email" size={32} color="#006aff" />
              <Text style={styles.mytext}>OrderId : Au23456</Text>
            </View>
         </Card>
    
         <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}>
            <Button 
             icon="account-edit"
             mode="contained"
             style = {styles.button}
              onPress={() => {
                navigation.navigate('EditProfile',{
                    name,email,phone
                })
              }}>
                Edit Profile
            </Button>
            <Button 
             icon="delete"
             mode="contained"
             style = {styles.button}
              onPress={() => logout()}>
                Logout
            </Button>
         </View>
        

      </View>
  )
}



const styles = StyleSheet.create({
    root:{
        flex:1
    },
    mycard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding:8
    },
    button : {
        backgroundColor : colors.accentPrimary,
        color : colors.back
    },
    mytext:{
        fontSize:18,
        marginTop:3,
        marginLeft:5
    }
})

export default ViewProfile