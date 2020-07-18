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

    const logout = async (props) => {
        const token = await AsyncStorage.removeItem("token")
        const user = await AsyncStorage.removeItem("user")
        if (!token) {
            props.navigation.replace("Login");
        }
    }

    return (
        <View>
            <Header>Profile</Header>
            <View style={styles.container}>
                <Text style={{
                    fontSize: 20, fontWeight: "bold"
                }}>Hello {user.name}</Text>
                <Button
                    mode="contained"
                    color={colors.accentPrimary}
                    style={styles.button}
                    onPress={() => navigation.navigate('EditProfile')}
                >
                    Edit Profile
                </Button>
                <View style={styles.recentOrders}>
                    <Text>Recent Orders </Text>
                </View>
                <Button
                    mode="contained"
                    color={colors.accentPrimary}
                    style={styles.button}
                    onPress={() => logout()}
                >
                    Log out
                </Button>
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
