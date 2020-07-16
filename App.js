import React, { useState, useEffect } from "react";
import { Linking } from 'react-native';
import { AsyncStorage } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//State
import { RecoilRoot } from 'recoil';

//Screens
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MainApp from './screens/MainApp';
import Splash from './screens/Splash';

const Stack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const App = () => {

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();


  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }


  const navigationOptions = {
    headerLeft: null
  }
  return (
    <RecoilRoot>
      <NavigationContainer initialState={initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        } >
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainApp" component={MainApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>

  )
}

export default App;
