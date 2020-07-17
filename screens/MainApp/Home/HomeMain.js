import React, { useContext } from 'react'
import { View, Text } from 'react-native';

import { GlobalContext } from '../../../context/GlobalState';

const HomeMain = () => {
    const { user } = useContext(GlobalContext);
    console.log(user);

    return (
        <View>
            <Text>Home Main Sceeen</Text>
            {/* {JSON.stringify(user)} */}
        </View>
    )
}

export default HomeMain
