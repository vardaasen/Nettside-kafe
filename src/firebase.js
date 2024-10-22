// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB88vuiuLI5lYfqLtdP3yMmz27qBIXtL34',
  authDomain: 'nettside-kafe.firebaseapp.com',
  projectId: 'nettside-kafe',
  storageBucket: 'nettside-kafe.appspot.com',
  messagingSenderId: '64935508298',
  appId: '1:64935508298:web:06d15ca5f4d2bffbf7a9b3',
  measurementId: 'G-Z6KBQXDHK1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
