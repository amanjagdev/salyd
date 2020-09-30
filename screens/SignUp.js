import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import {TextInput, ActivityIndicator } from "react-native-paper";
import Axios from "axios";
import * as Google from "expo-google-app-auth";

import { apiUrl } from "../config/keys";

//Componenents
import Header from "../components/Header";
import Button from "../components/Button";
import { colors } from "../constants/constant";

import firebase from "../config/firebase.js";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, isSubmitting] = useState(false);

  //O-Auth
  const [submittingGoogle, isSubmittingGoogle] = useState(false);
  const [usedGoogle, setUsedGoogle] = useState(false);

  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  // Function to be called when requesting for a verification code
  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phone, recaptchaVerifier.current)
      .then(setVerificationId);
  };

  // Function to be called when confirming the verification code that we received
  // from Firebase via SMS
  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        Axios.post(`${apiUrl}/signup`, {
          name,
          phone,
          email,
          password,
        })
          .then((res) => {
            console.log(res.data);
            if (res.data.error) {
              Alert.alert(res.data.error);
            } else {
              isSubmitting(false);
              navigation.replace("Login");
            }
          })
          .catch((err) => {
            isSubmitting(false);
            console.log(err);
          });
        console.log(result);
      });
  };

  const submitForm = () => {
    isSubmitting(true);
    sendVerification();
    isSubmitting(false);
  };

  const loginRedirect = () => {
    navigation.push("Login");
  };

  const signinwithgoogle = async () => {
    isSubmittingGoogle(true);
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "660122221015-ij45d8cg82f0b1kl68c09kq9o72t4eaj.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setName(result.user.name);
        setEmail(result.user.email);
        setUsedGoogle(true);
        isSubmittingGoogle(false);
      } else {
        console.log("Cancelled");
        isSubmittingGoogle(false);
      }
    } catch (e) {
      console.log("error", e);
      isSubmittingGoogle(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.back,
        height: Dimensions.get("screen").height,
      }}
    >
      <KeyboardAvoidingView behavior="position">
        <Header isBack navigation={navigation}>
          Sign Up
        </Header>

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app().options}
        />

        <TextInput
          label="Full name"
          value={name}
          underlineColor="transparent"
          theme={{ roundness: 20, colors: { primary: colors.accentPrimary } }}
          style={styles.inputbox}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          label="Phone Number"
          value={phone}
          keyboardType="phone-pad"
          underlineColor="transparent"
          theme={{ roundness: 20, colors: { primary: colors.accentPrimary } }}
          style={styles.inputbox}
          onChangeText={(text) => setPhone(text)}
        />

        <TextInput
          label="Email"
          value={email}
          disabled={usedGoogle}
          underlineColor="transparent"
          theme={{ roundness: 20, colors: { primary: colors.accentPrimary } }}
          style={styles.inputbox}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          label="Password"
          value={password}
          secureTextEntry={true}
          underlineColor="transparent"
          theme={{ roundness: 20, colors: { primary: colors.accentPrimary } }}
          style={styles.inputbox}
          onChangeText={(text) => setPassword(text)}
        />
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {usedGoogle && (
            <Text
              style={{
                marginBottom: 20,
                marginHorizontal: 30,
                color: colors.accentPrimary,
                textAlign: "center",
              }}
            >
              Fill the Phone Number and password, then register
            </Text>
          )}
          {submitting ? (
            <ActivityIndicator color={colors.accentPrimary} />
          ) : (
            <Button onPressFunction={() => submitForm()}>Logout</Button>
          )}
        </View>

        <View
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontFamily: "ProductSans", marginBottom: 20 }}>
            OR
          </Text>

          {submittingGoogle ? (
            <ActivityIndicator color="#4291ff" />
          ) : (
            <TouchableOpacity
              disabled={usedGoogle}
              onPress={() => signinwithgoogle()}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: 200,
                  padding: 25,
                  backgroundColor: "#fafafa",
                  height: 40,
                  justifyContent: "space-around",
                  borderRadius: 10,
                }}
              >
                <Image
                  style={{
                    height: 21,
                    width: 20,
                    marginRight: 40,
                  }}
                  source={require("../assets/vectors/google.png")}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "ProductSans",
                    color: usedGoogle ? "#d6d6d6" : "black",
                  }}
                >
                  Sign Up With Google
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {verificationId && (
          <>
            <TextInput
              label="Confirmation Code"
              onChangeText={setCode}
              keyboardType="number-pad"
              value={code}
              underlineColor="transparent"
              theme={{
                roundness: 20,
                colors: { primary: colors.accentPrimary },
              }}
              style={styles.inputbox}
            />

            <View
              style={{
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={confirmCode}>
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: colors.accentPrimary,
                    width: 100,
                    height: 40,
                    justifyContent: "space-around",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: "ProductSans",
                    }}
                  >
                    Confirm
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity onPress={() => loginRedirect()}>
          <Text
            style={{
              marginHorizontal: 25,
              marginTop: 25,
              fontSize: 16,
              paddingLeft: 10,
              borderRadius: 20,
              fontFamily: "ProductSans",
            }}
          >
            Already Have an account ? SignIn
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    marginLeft: 18,
    marginTop: 20,
    fontFamily: "ProductSans",
  },
  inputbox: {
    marginHorizontal: 25,
    marginTop: 25,
    paddingLeft: 10,
    backgroundColor: "#ddffd9",
    borderRadius: 20,
    fontFamily: "ProductSans",
  },
  button: {
    margin: 10,
    borderRadius: 10,
    marginTop: 30,
    height: 45,
    width: 200,
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 10,
    backgroundColor: colors.accentPrimary,
    color: colors.back,
    fontFamily: "ProductSans",
  },
  outlined: {
    borderColor: colors.back,
    borderWidth: 1,
  },
});

export default SignUp;
