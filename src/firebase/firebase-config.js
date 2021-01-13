import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAvSyZL7Uss2cxyhPZOOHQX9-f0LAJJTeQ",
    authDomain: "journal-app-84c19.firebaseapp.com",
    databaseURL: "https://journal-app-84c19.firebaseio.com",
    projectId: "journal-app-84c19",
    storageBucket: "journal-app-84c19.appspot.com",
    messagingSenderId: "245383739535",
    appId: "1:245383739535:web:1e522df601282877b618fa",
    measurementId: "G-6WQE105GLY"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
};