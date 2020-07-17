import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";
import { AsyncStorage } from 'react-native';

const retrieveItem = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.log('Failed to fetch the data from storage');
    }
}

const initialState = {
    user: "Hi i am a user",
    token: "Hi i am a token",
};

const Actions = {
    UPDATE_USER: "UPDATE_USER",
    UPDATE_TOKEN: "UPDATE_TOKEN"
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        async function fetchUser() {
            const user = await retrieveItem('user');
            dispatch({ type: Actions.UPDATE_USER, payload: user });
        }
        async function fetchToken() {
            const token = await AsyncStorage.getItem('token');
            dispatch({ type: Actions.UPDATE_TOKEN, payload: token });
        }
        fetchUser();
        fetchToken();
    }, [])

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