import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const MainStack = createStackNavigator()

//Screens
import Home from './MainApp/Home'
import Profile from './MainApp/Profile'

const MainApp = () => {
    return (
        <MainStack.Navigator initialRouteName="Home" headerMode="none">
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="Profile" component={Profile} />
        </MainStack.Navigator>
    )
}

export default MainApp
