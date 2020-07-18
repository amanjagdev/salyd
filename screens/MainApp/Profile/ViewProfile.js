import React, { useContext } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';

//Components
import Header from '../../../components/Header'

//Context
import { GlobalContext } from '../../../context/GlobalState';
import { colors } from '../../../constants/constant';

const heightOfScreen = Dimensions.get("window").height;

const ViewProfile = () => {
    const { user } = useContext(GlobalContext);

    return (
        <View>
            <Header>Profile</Header>
            <View style={styles.container}>
                <Text style={{
                    fontSize: 20, fontWeight: "bold"
                }}>Hello {user.name}</Text>
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
    recentOrders: {
        
    }
})

export default ViewProfile
