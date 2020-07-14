import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import HomeMain from './Home/HomeMain'
import Restro from './Home/Restro'
import Table from './Home/Table'

const HomeStack = createStackNavigator();

const Home = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeMain" component={HomeMain} />
            <HomeStack.Screen name="Restro" component={Restro} />
            <HomeStack.Screen name="Table" component={Table} />
        </HomeStack.Navigator>
    )
}

export default Home
