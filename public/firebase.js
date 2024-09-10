// firebase.js

// Check if Firebase is already initialized to avoid multiple initialization
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyDaOUUJoSRo3kX_IiACjM_s0beySR4Mo",
    authDomain: "crepe-3968c.firebaseapp.com",
    databaseURL: "https://crepe-3968c-default-rtdb.firebaseio.com",
    projectId: "crepe-3968c",
    storageBucket: "crepe-3968c.appspot.com",
    messagingSenderId: "709781337343",
    appId: "1:709781337343:web:428ed9d78d75a1ce7dc8ca",
    measurementId: "G-4T0RZE9X6C"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = firebase.firestore();

  // Export Firestore instance if needed
  window.db = db;
}
