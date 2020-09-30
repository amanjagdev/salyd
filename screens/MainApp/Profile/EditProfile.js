import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { MaterialCommunityIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons'
import { Button as ButtonPaper } from "react-native-paper";

//Components
import Header from '../../../components/Header'
import Button from '../../../components/Button'

//Context
import { GlobalContext } from '../../../context/GlobalState';
import { colors } from '../../../constants/constant';
import {apiUrl } from '../../../config/keys';
import Axios from 'axios';

const heightOfScreen = Dimensions.get("window").height;

const ViewProfile = ({ navigation }) => {

    //Definning states
    const [modal, setModal] = useState(false);
    const { user, token } = useContext(GlobalContext);

    const saveProfile = () => {
        console.log("Updated Profile");
        navigation.navigate('ViewProfile')
    }
    const uploadPic = (file) => {
        Axios({
            url: `${apiUrl}/uploadpic`,
            method: 'post',
            headers: {
                "Content-type": `application/json`,
                "Authorization": `Bearer ${token}`,
                "Accept": `application/json`
            },
            body: {imgb64: file}
        }).then((response) => {
            console.log("i am herrrr");
            console.log(response)
        }).catch((err) => {
            console.error(err)
        })
    }

    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
				base64: true,
            })

            if (!data.cancelled) {
                uploadPic(data.base64)
            }
        }
    }

    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)

        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })

            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }

                uploadPic(newfile.uri);
            }
        }
    }

    return (
        <View>
            <Header navigation={navigation} isBack>Edit Profile</Header>
            <View style={styles.container}>
                <Text style={{
                    fontSize: 20, fontWeight: "bold"
                }}>Hello {user.name}</Text>
                <TouchableOpacity onPress={() => setModal(true)}>
                    <Text style={styles.changedp}> Change your profile picture</Text>
                </TouchableOpacity>
                <Button
                    onPressFunction={() => saveProfile()}
                >
                    Save
                </Button>
                <View style={styles.recentOrders}>
                    <Text>Recent Orders </Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false)
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <ButtonPaper
                                icon="camera"
                                mode="contained"
                                style={styles.buttonpaper}
                                onPress={() => pickFromCamera()}>
                                Camera
                        </ButtonPaper>

                            <ButtonPaper
                                icon="image-area"
                                mode="contained"
                                style={styles.buttonpaper}
                                onPress={() => pickFromGallery()}>
                                Gallery
                        </ButtonPaper>

                        </View>

                    </View>

                </Modal>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.back,
        height: heightOfScreen,
        padding: 20
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
})

export default ViewProfile
