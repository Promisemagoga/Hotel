// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getStorage} from "firebase/storage";




import {getAuth, onAuthStateChanged} from "firebase/auth"
import{getFirestore} from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyCsXATK0Ol5HIbhnKhAkiOXEsZN4vg1ZNA",
  authDomain: "hotel-booking-app-d2bf5.firebaseapp.com",
  projectId: "hotel-booking-app-d2bf5",
  storageBucket: "hotel-booking-app-d2bf5.appspot.com",
  messagingSenderId: "474334696776",
  appId: "1:474334696776:web:849c56d639c5f2bcc68f7d",
  measurementId: "G-5TCJQ64ZVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)
// const AuthContext =createContext()

export {auth, db, storage}






