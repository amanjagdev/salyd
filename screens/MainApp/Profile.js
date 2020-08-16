import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import EditProfile from './Profile/EditProfile'
import ViewProfile from './Profile/ViewProfile'
import Contact from "./Profile/Contact";
import RecentOrders from './Profile/RecentOrders';

const ProfileStack = createStackNavigator();

const Profile = () => {
    return (
        <ProfileStack.Navigator headerMode="none">
            <ProfileStack.Screen name="ViewProfile" component={ViewProfile} />
            <ProfileStack.Screen name="EditProfile" component={EditProfile} />
            <ProfileStack.Screen name ="Contact" component = {Contact} />
            <ProfileStack.Screen name = "RecentOrders" component = {RecentOrders} />
        </ProfileStack.Navigator>
    )
}

export default Profile