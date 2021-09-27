
import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHTAq673M6t67uY-KpJFd9CZySJXsM_po",
  authDomain: "slack-clone-yt-70caf.firebaseapp.com",
  projectId: "slack-clone-yt-70caf",
  storageBucket: "slack-clone-yt-70caf.appspot.com",
  messagingSenderId: "398108077790",
  appId: "1:398108077790:web:2cd9809653dd1a48701c4f",
  measurementId: "G-Y251D1RJD7",
};

// const firbaseApp = firebase.initializeApp(firebaseConfig);
// const db = firbaseApp.firestore();
// const auth = firebase.auth();
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
