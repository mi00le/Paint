import * as firebase from 'firebase';
 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBI9NIuZPn0-Lz5x1Q6KHQi-waUBo8YK0Y",
    authDomain: "painter-4b28e.firebaseapp.com",
    databaseURL: "https://painter-4b28e.firebaseio.com",
    projectId: "painter-4b28e",
    storageBucket: "painter-4b28e.appspot.com",
    messagingSenderId: "188103321319"
  };

firebase.initializeApp(config);


export default firebase;
