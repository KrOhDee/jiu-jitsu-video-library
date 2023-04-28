import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAWVx1rtM3Hu650ZPCvDswcbsipYRnrCMA',
  authDomain: 'jiu-jitsu-library-41b02.firebaseapp.com',
  projectId: 'jiu-jitsu-library-41b02',
  storageBucket: 'jiu-jitsu-library-41b02.appspot.com',
  messagingSenderId: '718998829755',
  appId: '1:718998829755:web:46cfa0c7c39749197d479e',
  measurementId: 'G-7Q9D9QGSX0',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
