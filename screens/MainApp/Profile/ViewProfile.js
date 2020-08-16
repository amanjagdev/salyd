import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, AsyncStorage } from 'react-native';
import Header from '../../../components/Header';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

//Context
import { GlobalContext } from '../../../context/GlobalState';
import { colors } from '../../../constants/constant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../../components/Button';

const ViewProfile = ({ navigation }) => {

    const { user } = useContext(GlobalContext);
    const { _id, name, email, phone, password } = user;

    const logout = async () => {
        const token = await AsyncStorage.removeItem("token")
        const user = await AsyncStorage.removeItem("user")
        if (!token) {
            navigation.replace("Login");
        }
    }

    return (
        <React.Fragment>
            <Header isBack navigation={navigation}>Profile</Header>
            <View style={styles.container}>

                {/* Header  */}
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}>
                    <View style={{ flex: 3, alignItems: "center" }}>
                        <FontAwesome5 name="user-circle" size={100} color="#009c0a" />
                    </View >
                    <View style={{ flex: 4, marginLeft: 30 }}>
                        <Text style={{ fontFamily: "ProductSansBold", fontSize: 20 }}>{user && user.name}</Text>
                        <Text style={{ fontFamily: "ProductSans", marginTop: 2 }}>Here is your Profile</Text>
                    </View>
                </View>

                <View style={{
                    marginTop: 40,
                    flexDirection: "row"
                }}>
                    <Text style={{
                        fontFamily: "ProductSansBold",
                        fontSize: 20,
                        color: "#009c0a"
                    }}> Your Recent orders</Text>
                    <TouchableOpacity 
                        onPress={() => navigation.push("Orders")}
                    style={{
                        marginLeft: 15
                    }}>
                        <Ionicons name="ios-arrow-forward" color="#009c0a" size={26} />
                    </TouchableOpacity>
                </View>
                    <Button onPressFunction={logout}>Logout</Button>
            </View>
        </React.Fragment>
    )
}



const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: Dimensions.get("screen").height,
        backgroundColor: "white"
    },
})

export default ViewProfile