import firebase from 'firebase'
require('@firebase/firestore')

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBq2pqv5DdbuVUlfI4p11aaIAemVckMY2c",
    authDomain: "barterapp-cf798.firebaseapp.com",
    projectId: "barterapp-cf798",
    storageBucket: "barterapp-cf798.appspot.com",
    messagingSenderId: "83613970430",
    appId: "1:83613970430:web:fd7b00f03f05cf1f105aaf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()