import React from 'react'
import { View, Text , StyleSheet } from 'react-native';
import { colors } from '../constants/constant'

const Header = ({children}) => {
    return (
        <View style={styles.container}>
            <Text style={{color: colors.back, fontSize: 18,fontWeight: "bold"}}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        backgroundColor: colors.accentPrimary,
        padding: 20
    }
})

export default Header
