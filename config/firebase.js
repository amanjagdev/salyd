import * as firebase from 'firebase';
import '@firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBMnOtvII9H0algBmY5oiu7jfnDsr3agT0",
    authDomain: "salyd-93b68.firebaseapp.com",
    databaseURL: "https://salyd-93b68.firebaseio.com",
    projectId: "salyd-93b68",
    storageBucket: "salyd-93b68.appspot.com",
    messagingSenderId: "528807511915",
    appId: "1:528807511915:web:9d68d0cfd0bb82870bae2e",
    measurementId: "G-BQKE0B8GSB"
};

firebase.initializeApp(firebaseConfig);

export default firebase