import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCeLPflejD3clgQgr7fT7uHlUeaAwpvM3U",
    authDomain: "marioplan-e0d39.firebaseapp.com",
    databaseURL: "https://marioplan-e0d39.firebaseio.com",
    projectId: "marioplan-e0d39",
    storageBucket: "marioplan-e0d39.appspot.com",
    messagingSenderId: "149525560969",
    appId: "1:149525560969:web:43f25bdd24272b4b339058",
    measurementId: "G-HVR17SYPNP"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;