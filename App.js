import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

//State
import { GlobalProvider } from './context/GlobalState'

//Screens
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MainApp from './screens/MainApp';
import Splash from './screens/Splash';
import Guest from './screens/Guest';

const Stack = createStackNavigator();

const App = () => {

  const [isReady, setIsReady] = useState(false);
  const [initialScreen, setInititalScreen] = useState("Splash");
  const [loaded] = useFonts({
    'ProductSans': require('./assets/fonts/Product_Sans_Regular.ttf'),
    'ProductSansItalic': require('./assets/fonts/Product_Sans_Italic.ttf'),
    'ProductSansBold': require('./assets/fonts/Product_Sans_Bold.ttf'),
    'ProductSansBoldItalic': require('./assets/fonts/Product_Sans_Bold_Italic.ttf'),
  });
  console.disableYellowBox = true;
  useEffect(() => {
    const checkToken = async () => {
      const user = await AsyncStorage.getItem('user');
      console.log(user)
      if (user) {
        setInititalScreen("MainApp");
      }
      setIsReady(true);
    }
    checkToken()
  }, []);

  if (!isReady || !loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <ApplicationProvider {...eva} theme={eva['dark']}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName={initialScreen}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MainApp" component={MainApp} />
            <Stack.Screen name="Guest" component={Guest} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </GlobalProvider>

  )
}

export default App;
