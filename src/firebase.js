import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyC9ydCzPit4eteCPpofviIfUg8DtG86y3k',
  authDomain: 'jiu-jitsu-library-41b02.firebaseapp.com',
  projectId: 'jiu-jitsu-library-41b02',
  storageBucket: 'jiu-jitsu-library-41b02.appspot.com',
  messagingSenderId: '718998829755',
  appId: '1:718998829755:web:46cfa0c7c39749197d479e',
  measurementId: 'G-7Q9D9QGSX0',
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
