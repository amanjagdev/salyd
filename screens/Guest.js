import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const GuestStack = createStackNavigator();

import JoinTable from './MainApp/Home/JoinTable'
import Menu from './MainApp/Home/Menu'

const Guest = () => {
    return (
        <GuestStack.Navigator headerMode="none">
            <GuestStack.Screen name="JoinTable" component={JoinTable} />
            <GuestStack.Screen name="Menu" component={Menu} />
        </GuestStack.Navigator>
    )
}

export default Guest
