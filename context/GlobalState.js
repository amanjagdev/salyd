import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { AsyncStorage } from 'react-native';

const retrieveItem = async (key) => {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      console.log(item)
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
}

const initialState = {
    user: retrieveItem('user'),
    token: AsyncStorage.getItem('token'),
};

export const Actions = {
    UPDATE_USER: "UPDATE_USER",
    UPDATE_TOKEN: "UPDATE_TOKEN"
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const updateUser = (userData) => {
        dispatch({
            type: Actions.UPDATE_USER,
            payload: userData
        });
    }

    const updateToken = (userData) => {
        dispatch({
            type: Actions.UPDATE_TOKEN,
            payload: userData
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                user: state.user,
                token: state.token,
                updateUser,
                updateToken
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};