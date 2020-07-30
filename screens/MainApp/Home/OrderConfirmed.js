import React from 'react'
import { View, Dimensions } from 'react-native'
import { colors } from '../../../constants/constant';
import { Text, Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const OrderConfirmed = ({ navigation }) => {

    const goToHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'HomeMain',
                    },
                ],
            })
        );
    }

    return (
        <View style={{
            height: Dimensions.get("window").height,
            backgroundColor: colors.back,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Icon name="checkbox-marked-circle-outline" size={100} color={colors.accentPrimary}></Icon>
            <Text style={{
                fontSize: 17, color: colors.accentPrimary, marginTop: 10,
            }}>Your Order Is Confirmed</Text>
            <Button
                icon="home"
                color={colors.accentPrimary}
                style={{
                    marginTop: 20
                }}
                dark
                mode="contained"
                size={20}
                onPress={() => goToHome()}
            >Home</Button>
        </View>
    )
}

export default OrderConfirmed
