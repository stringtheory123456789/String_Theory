// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
console.disableYellowBox = true;
// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAnH8giPLppvTy0qaezXqZtQP65tOTjfWQ",

  authDomain: "annaseva-9507d.firebaseapp.com",

  projectId: "annaseva-9507d",

  storageBucket: "annaseva-9507d.appspot.com",

  messagingSenderId: "284693924508",

  appId: "1:284693924508:web:acc797ed808ecd4149bb59",

  measurementId: "G-5TJ26ZBH4Z"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Async function for user registration
const createUserWithEmailAndPasswordAsync = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Registered with:', user.email);
    return user;
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
};

// Async function for user login
const signInWithEmailAndPasswordAsync = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Logged in with:', user.email);
    return user;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};
const sendPasswordResetEmailAsync = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent. Please check your email.');
    } catch (error) {
      console.error('Password reset error:', error.message);
      throw error;
    }
  };

// export { auth, createUserWithEmailAndPasswordAsync, signInWithEmailAndPasswordAsync };
export { auth, createUserWithEmailAndPasswordAsync, signInWithEmailAndPasswordAsync, sendPasswordResetEmailAsync };
