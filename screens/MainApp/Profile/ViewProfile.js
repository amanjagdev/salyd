import React, { useContext,useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, AsyncStorage, TouchableOpacity,Modal,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { MaterialCommunityIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {Button as ButtonPaper} from "react-native-paper";

//Context
import { GlobalContext } from '../../../context/GlobalState';
import { colors } from '../../../constants/constant';
import Axios from 'axios';
import {localapiUrl} from "../../../config/keys";

const width = Dimensions.get("window").width;

const ViewProfile = ({ navigation }) => {

    //Definning states
    const [modal,setModal] = useState(false);

    const { user,token } = useContext(GlobalContext);
    const { _id, name, email, phone, image } = user;

    const logout = async () => {
        const token = await AsyncStorage.removeItem("token")
        const user = await AsyncStorage.removeItem("user")
        if (!token) {
            navigation.replace("Login");
        }
    }
    
    const uploadPic = (file) => {
        console.log(file,"In upload pic");
        const formData = new FormData();
        formData.append('image',file);
        console.log(formData)
        Axios({
            url: `${localapiUrl}/uploadpic`,
            method: 'post',
            headers: {
                "Content-type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
                "Accept": `application/json`
            },
            body: formData
        }).then((response) => {
            console.log("i am herrrr");
            Alert.alert(response.data);
        }).catch((err) => {
            Alert.alert(err);
        })
    }

    const pickFromGallery = async () => {
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
            let data =  await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })

            if(!data.cancelled){
                const uriParts = data.uri.split(".")
                let newfile = { 
                    uri:data.uri,
                    type:`image/${uriParts[uriParts.length - 1]}`,
                    name:`${uriParts[0]}`  
                }
                console.log(newfile);
                uploadPic(newfile);
            }
        }
    }

    const pickFromCamera = async () => {
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
        
        if(granted){
            let data =  await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })

            if(!data.cancelled){
                let newfile = { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}` 
                }

                uploadPic(newfile.uri);
            }
        }
    }

    return (
        <View style={styles.root}>
            {/* <LinearGradient
         colors={["#77f298","#00de5c"]}
         style={{height:"20%"}}
         >
             
        </LinearGradient> */}
            <Header navigation={navigation} isBack> View Profile </Header>
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{ width: 140, height: 140, borderRadius: 140 / 2, marginTop: 50 }}
                    source={{uri :image}}
                />

                <TouchableOpacity onPress = {() => setModal(true)}>
                    <Text style = {styles.changedp}> Change your profile picture</Text>
                </TouchableOpacity>

            </View>
            <View style={{ alignItems: "center", margin: 15 }}>
                <Text style={styles.name}> {name} </Text>
            </View>

            <TouchableOpacity onPress={() => {
                navigation.navigate('EditProfile', {
                    name, email, phone
                })
            }}>
                <View style={styles.cardContainer}>
                    <View style={styles.mycard}>
                        <View style={styles.cardContent}>
                            <FontAwesome name="user-circle" style={styles.icon} />
                            <Text style={styles.mytext}>Account Details</Text>
                            <Ionicons name="ios-arrow-forward" style={styles.arrow} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate('RecentOrders')
            }}>
                <View style={styles.mycard}>
                    <View style={styles.cardContent}>
                        <MaterialCommunityIcons name="food-variant" style={styles.icon} />
                        <Text style={styles.mytext}>Order History</Text>
                        <Ionicons name="ios-arrow-forward" style={styles.arrow} />
                    </View>
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                navigation.navigate('Contact')
            }}>

                <View style={styles.mycard} onPress={() => {
                    navigation.navigate('Contact')
                }}>
                    <View style={styles.cardContent}>
                        <Feather name="phone-call" style={styles.icon} />
                        <Text style={styles.mytext}>Contact Us</Text>
                        <Ionicons name="ios-arrow-forward" style={styles.arrow} />
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Button onPressFunction={() => logout()}>Logout</Button>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={()=>{
                    setModal(false)
                }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                        <ButtonPaper
                            icon="camera"
                            mode="contained"
                            style = {styles.buttonpaper}
                            onPress={() => pickFromCamera()}>
                                Camera
                        </ButtonPaper>
                        
                        <ButtonPaper
                            icon="image-area"
                            mode="contained"
                            style = {styles.buttonpaper}
                            onPress={() => pickFromGallery()}>
                                Gallery
                        </ButtonPaper>

                    </View>

                </View>

            </Modal>

        </View>
    )
}



const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    cardContainer: {
        marginTop: 30
    },
    name: {
        fontFamily: "ProductSans",
        fontSize: 24,
    },
    changedp : {
        fontFamily : "ProductSans",
        fontSize : 20,
        color : colors.back.accentPrimary
    },
    mycard: {
        margin: 3
    },
    cardContent: {
        flexDirection: "row",
        padding: 10
    },
    icon: {
        fontSize: 32,
        paddingRight: 10,
        fontWeight: "bold",
        color: "#00de5c"
    },
    arrow: {
        position: "absolute",
        right: 20,
        paddingTop: 10,
        fontSize: 30,
        color: "#c0c0c0"
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"

    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    },
    button: {
        backgroundColor: colors.accentPrimary,
        color: colors.back,
        width: width * 0.85,
        marginLeft: width * 0.08,
        marginTop: 50,
        borderRadius: 10,
        fontFamily: "ProductSans"
    },
    buttonpaper : {
        backgroundColor: colors.accentPrimary,
        fontFamily : "ProductSans"
    },
    mytext: {
        fontSize: 18,
        marginTop: 3,
        fontFamily: "ProductSans",
        marginLeft: 5
    }
})

export default ViewProfile