import React, { useState, useEffect, useContext } from "react";
import Button from "../../../components/Button";
import { CommonActions } from '@react-navigation/native';
import { apiUrl } from '../../../config/keys';
import { GlobalContext } from '../../../context/GlobalState'
import { FontAwesome5 } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  AsyncStorage,
  Dimensions,
  ImageBackground
} from "react-native"
import Axios from "axios";

import Header from '../../../components/Header'
import { colors } from "../../../constants/constant";
import { ActivityIndicator } from "react-native-paper";

const Table = ({ navigation }) => {

  const [selectedValue, setSelectedValue] = useState("view");
  const [restro, setRestro] = useState({});
  const [submitting, isSubmitting] = useState(false);
  const { token, globalRoomId, updateTable, updateRoom, globalTableId, updateRestro } = useContext(GlobalContext);

  useEffect(() => {
    Axios({
      url: `${apiUrl}/getrestro`,
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      data: { "tableId": globalTableId }
    }).then((res) => {
      console.log(res.data);
      setRestro(res.data.tableOf);

      //Updating the restro in global state
      updateRestro(res.data.tableOf);

    }).catch((err) => {
      res.status(422).json(err);
    })
  }, [])

  const onSubmit = () => {
    isSubmitting(true)
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
        isSubmitting(false)
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
        isSubmitting(false)
        console.log(err);
      })
  }

  const exitTable = async () => {
    updateRoom(null)
    updateTable(null)
    const tableid = await AsyncStorage.removeItem('tableId')
    navigation.navigate('HomeMain')
  }

  console.log()

  return (
    <View>
      <Header navigation={navigation} isBack>Your Table</Header>
      <View style={styles.container}>

        <View style={{
          marginTop: 30,
          marginBottom: 50,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center"
        }}>

          <View style={{
            flex: 2,
            alignItems: "center"
          }}>
            <Text style={{
              color: "black",
              fontSize: 50,
              textAlign: "center",
              color: colors.accentPrimary,
              fontFamily: "ProductSansBold",
            }}>{globalRoomId}</Text>
            <View style={{
              alignItems: "center",
              flexDirection: "row"
            }}  >
              <View style={{
                backgroundColor: colors.accentPrimary,
                height: 3,
                width: 100,
                borderRadius: 20
              }} />
              <View style={{
                backgroundColor: colors.accentPrimary,
                height: 3,
                marginLeft: 5,
                width: 15,
                borderRadius: 20
              }} />
            </View>
          </View>

          <View style={{
            flex: 3,
          }}>
            <Image style={{
              marginLeft: 40,
              width: 152,
              height: 174
            }} source={require("../../../assets/share_Image.png")} />
          </View>
        </View>

        {/* SHARE ID  */}
        <View style={{
          flexDirection: "row",
          backgroundColor: "#d8ffcf",
          borderRadius: 10,
          padding: 20,
          alignItems: "center"
        }}>
          <FontAwesome5 style={{
            marginRight: 20
          }} name="lightbulb" size={24} color="black" />
          <Text style={{
            fontFamily: "ProductSans",
            marginRight: 30
          }}>Share this Room Id with your colleagues to let them join the table</Text>
        </View>


        {/* GRANT PERMISSION  */}
        <View style={{
          marginTop: 40
        }}>
          <Text style={{
            fontSize: 20,
            textAlign: "center",
            fontFamily: "ProductSans"
          }}> Grant permission to the members</Text>

          <View style={{
            margin: 0,
            padding: 0,
            height: 70,
            alignItems: "center",
            flexDirection: 'row',
            justifyContent: "center"
          }}>
            <Button
              colorBack={selectedValue === "view" ? colors.accentPrimary : "#d8ffcf"}
              colorText={selectedValue === "view" ? colors.back : colors.accentPrimary}
              mystyle={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
              }}
              onPressFunction={() => setSelectedValue("view")}
            >
              View
          </Button>
            <Button
              colorBack={selectedValue === "edit" ? colors.accentPrimary : "#d8ffcf"}
              colorText={selectedValue === "edit" ? colors.back : colors.accentPrimary}
              mystyle={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
              }}
              onPressFunction={() => setSelectedValue("edit")}
            >
              Edit
          </Button>

          </View>

          <View style={{
            alignItems: "center",
          }}>
            {
              submitting ?
                <View style={{
                  marginTop: 15
                }}>
                  <ActivityIndicator color={colors.accentPrimary} />
                </View> :
                <Button
                  mode="contained"
                  onPressFunction={() => onSubmit()}
                >Proceed</Button>
            }
          </View>
        </View>

        {/* EXIT TABLE  */}
        <View style={{
          marginTop: 40
        }}>
          <Text style={{
            fontSize: 20,
            textAlign: "center",
            fontFamily: "ProductSans"
          }}> Exit Table</Text>

          <View style={{
            alignItems: "center",
            marginTop: 15
          }}>
            <Button
              colorBack="#ff6257"
              onPressFunction={() => exitTable()}
            >
              Exit Table
        </Button>
          </View>
        </View>

      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.back,
    padding: 20,
    height: Dimensions.get("window").height
  },
  image: {
    flex: 0.7,
    opacity: 0.9,
    position: 'relative', // because it's parent
  },
  title: {
    fontFamily: "ProductSans",
    fontSize: 20,
    color: "white",
    position: 'absolute', // child
    bottom: 20, // position where you want
    left: 10
  },
  button: {
    margin: 10,
    borderRadius: 50,
    marginBottom: 20,
    color: colors.back
  },
  buttonBottom: {
    marginBottom: 0,
    position: "relative",
    height: 40,
    fontFamily: "ProductSans"
  },
  outlined: {
    borderColor: colors.back,
    borderWidth: 1
  },
})

export default Table