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

const Table = ({ route, navigation }) => {
  const [selectedValue, setSelectedValue] = useState("View");
  const { token, gloablRoomId, updateTable, updateRoom } = useContext(GlobalContext);

  const onSubmit = async () => {

    //Granting the permission to other table members via admin
    Axios.post(`${apiUrl}/permission/grant`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      "permission": selectedValue
    })
      .then((res) => {
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
    const tablei = await AsyncStorage.removeItem('roomId')
    navigation.navigate('HomeMain')
  }

  return (
    <View>
      <Header>Your Table</Header>
      <View style={styles.container}>

        <Text style={styles.roomId}>   Share this Id with your friends and relative to enjoy chatakedaar kahana with them
          : {gloablRoomId} </Text>

        <Text> Grant permission to the members</Text>

        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="View" value="view" />
          <Picker.Item label="Add" value="add" />
          <Picker.Item label="Edit" value="edit" />

        </Picker>

        <Button
          mode="contained"
          color={colors.accentPrimary}
          style={styles.button}
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
    fontSize: 18,
    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
    marginBottom: 20
  },
  roomId: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
})

export default Table