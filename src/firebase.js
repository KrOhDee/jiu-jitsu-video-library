import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAWVx1rtM3Hu650ZPCvDswcbsipYRnrCMA',
  authDomain: 'jiu-jitsu-library.firebaseapp.com',
  projectId: 'jiu-jitsu-library',
  storageBucket: 'jiu-jitsu-library.appspot.com',
  messagingSenderId: '310592510039',
  appId: '1:310592510039:web:b1ae0c5d5792d11b332b12',
  measurementId: 'G-3XX5BC3Z95',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
