import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCjQY4CjdsL-C83_sSbLzP4cwDy8dkSmmY",
  authDomain: "athena-40c7b.firebaseapp.com",
  databaseURL: "https://athena-40c7b.firebaseio.com",
  projectId: "athena-40c7b",
  storageBucket: "athena-40c7b.appspot.com",
  messagingSenderId: "638613255192",
  appId: "1:638613255192:web:4de5d6072652779108bf6d",
  measurementId: "G-ZYG9QXXQXY",
});

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export { db, storage };
