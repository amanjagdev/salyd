import React, { useContext } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

//Components
import Header from '../../../components/Header'

//Context
import { GlobalContext } from '../../../context/GlobalState';
import { colors } from '../../../constants/constant';

const heightOfScreen = Dimensions.get("window").height;

const ViewProfile = ({ navigation }) => {
    const { user } = useContext(GlobalContext);
    
    const saveProfile = () => {
        console.log("Updated Profile");
        navigation.navigate('ViewProfile')
    }

    return (
        <View>
            <Header navigation={navigation} isBack>Edit Profile</Header>
            <View style={styles.container}>
                <Text style={{
                    fontSize: 20, fontWeight: "bold"
                }}>Hello {user.name}</Text>
                <Button
                    mode="contained"
                    color={colors.accentPrimary}
                    style={styles.button}
                    onPress={() => saveProfile()}
                >
                    Save
                </Button>
                <View style={styles.recentOrders}>
                    <Text>Recent Orders </Text>
                </View>
            </View  >
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
