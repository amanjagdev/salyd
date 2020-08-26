import React,{useState,useRef} from "react"
import {
    Text,
    TextInput,
    View,
    AsyncStorage,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
    Alert,
    Image,
    Dimensions,
} from "react-native";

import firebase from "../config/firebase.js"
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

const Otp = () => {
    
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    
    // Function to be called when requesting for a verification code
    const sendVerification = () => {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(phoneNumber,recaptchaVerifier.current)
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
          // Do something with the results here
          console.log(result);
        });
    }

    return (

        <View style={styles.container}>

        <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebase.app().options}
        />

         {/* Phone Number Input */}
        <TextInput
            placeholder="Phone Number"
            style={styles.textInput}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="phone-pad"
            autoCompleteType="tel"
        />

        <TouchableOpacity 
             style={styles.sendVerification}
            onPress={sendVerification}
        >
            <Text style = {styles.buttonText}> Send Verification</Text>

        </TouchableOpacity>
        
        {/* Verification Code Input */}
        
        <TextInput
            placeholder="Confirmation Code"
            style={styles.textInput}
            onChangeText={setCode}
            keyboardType="number-pad"
        />
    
        <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
            <Text style={styles.buttonText}>Confirm Code</Text>
        </TouchableOpacity>
 
        </View>     
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
      paddingTop: 40,
      paddingBottom: 20,
      paddingHorizontal: 20,
      fontSize: 24,
      borderBottomColor: '#7f8c8d33',
      borderBottomWidth: 2,
      marginBottom: 10,
      textAlign: 'center',
    },
    sendVerification: {
      padding: 20,
      backgroundColor: '#3498db',
      borderRadius: 10,
    },
    sendCode: {
      padding: 20,
      backgroundColor: '#9b59b6',
      borderRadius: 10,
    },
    buttonText: {
      textAlign: 'center',
      color: '#ffffff',
    },
  });

export default Otp