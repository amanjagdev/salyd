import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//State
import { GlobalProvider } from './context/GlobalState'

//Screens
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MainApp from './screens/MainApp';
import Splash from './screens/Splash';

const Stack = createStackNavigator();

const App = () => {

  const [isReady, setIsReady] = useState(false);
  const [initialScreen, setInititalScreen] = useState("Splash");

  useEffect(() => {
    const checkToken = async () => {
      const user = await AsyncStorage.getItem('user');
      console.log(user)
      if(user){
        setInititalScreen("MainApp"); 
      }
      setIsReady(true);
    }
    checkToken()
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName={initialScreen}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainApp" component={MainApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>

  )
}

export default App;
