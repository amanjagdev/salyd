import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import HomeMain from './Home/HomeMain'
import Menu from './Home/Menu'
import Table from './Home/Table'

const HomeStack = createStackNavigator();

const Home = () => {
    return (
        <HomeStack.Navigator headerMode="none">
            <HomeStack.Screen name="HomeMain" component={HomeMain} />
            <HomeStack.Screen name="Menu" component={Menu} />
            <HomeStack.Screen name="Table" component={Table} />
        </HomeStack.Navigator>
    )
}

export default Home
