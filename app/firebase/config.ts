import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebase = initializeApp({
  apiKey: "AIzaSyA9KhlMR-C22B-vZHhNjwxsrzcSVM9E2s4",
  authDomain: "trckr-es.firebaseapp.com",
  projectId: "trckr-es",
  storageBucket: "trckr-es.appspot.com",
  messagingSenderId: "186205034568",
  appId: "1:186205034568:web:9dbd43c24fe46de018a07d",
  measurementId: "G-JQ23Z2G60J",
});

export const firebaseAuth = getAuth(firebase);
