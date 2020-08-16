import React, { useState, useEffect, useContext } from "react";
import { Button, TextInput } from "react-native-paper";
import { CommonActions } from '@react-navigation/native';
import { apiUrl } from '../../../config/keys';
import { GlobalContext } from '../../../context/GlobalState'
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Picker,
  AsyncStorage,
  Dimensions
} from "react-native"
import Axios from "axios";

import Header from '../../../components/Header'
import { colors } from "../../../constants/constant";

const Table = ({ navigation }) => {

  const [selectedValue, setSelectedValue] = useState("view");
  const [restro,setRestro] = useState({});
  const { token, globalRoomId, updateTable, updateRoom,globalTableId,updateRestro } = useContext(GlobalContext);

  useEffect(() => {
    Axios({
      url: `${apiUrl}/getrestro`,
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      data: { "tableId": globalTableId}
    }).then((res) => {
      console.log(res.data);
      setRestro(res.data.tableOf);
      
      //Updating the restro in global state
      updateRestro(res.data.tableOf);    

    }).catch((err) => {
      res.status(422).json(err);
    })  
  },[])
  
  const onSubmit = () => {
    Axios({
      url: `${apiUrl}/permission/grant`,
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      data: { "permission": selectedValue }
    })
      .then((res) => {
        console.log(res.data)
        Alert.alert(`Permission of all members set to ${selectedValue}`);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Menu',
              },
            ],
          })
        );

      }).catch((err) => {
        console.log(err);
      })
  }

  const exitTable = async () => {
    updateRoom(null)
    updateTable(null)
    const tableid = await AsyncStorage.removeItem('tableId')
    navigation.navigate('HomeMain')
  }

  return (
    <View>
      <Header>Your Table</Header>
      <View style={styles.container}>
        <Text style={{
          color: colors.accentPrimary,
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center"
        }}>Room Id : {globalRoomId}</Text>
        <Text style={styles.roomId}>Share this Room Id with your colleagues to let them join the table</Text>

        <Text style={{
          fontSize: 20,
          margin: 30,
          textAlign: "center"
        }}> Grant permission to the members</Text>

        <View style={{
          margin: 0,
          padding: 0,
          height: 70,
          alignItems: "center",
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: "center"
        }}>
          <Button
            mode="contained"
            color={selectedValue === "view" ? colors.accentPrimary : colors.back}
            style={styles.button}
            onPress={() => setSelectedValue("view")}
          >
            View
          </Button>
          <Button
            mode="contained"
            color={selectedValue === "edit" ? colors.accentPrimary : colors.back}
            style={styles.button}
            onPress={() => setSelectedValue("edit")}
          >
            Edit
          </Button>
          
        </View>

        <Button
          mode="contained"
          color={colors.accentPrimary}
          style={styles.buttonBottom}
          onPress={() => onSubmit()}
        >
          Proceed
        </Button>

        <Button
          mode="contained"
          color={colors.accentPrimary}
          style={styles.button}
          onPress={() => exitTable()}
        >
          Exit Table
        </Button>
        </View>
      </View>

  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.back,
    height: Dimensions.get("window").height
  },
  button: {
    margin: 10,
    borderRadius: 50,
    marginBottom: 20,
    color: colors.back
  },
  buttonBottom : {
    marginBottom : 0,
    position : "relative",
    height : 40,
    fontFamily : "DMSansBold"
  },
  outlined: {
    borderColor: colors.back,
    borderWidth: 1
  },
  roomId: {
    margin: 10,
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
    fontFamily : "DMSansRegular"
  }
})

export default Table