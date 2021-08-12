import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
  apiKey: "AIzaSyDNXUwiFJ_pNXqwcyo2cM90ToR84Wx_tG4",
  authDomain: "crwn-db-cd3a2.firebaseapp.com",
  databaseURL: "https://crwn-db-cd3a2.firebaseio.com",
  projectId: "crwn-db-cd3a2",
  storageBucket: "crwn-db-cd3a2.appspot.com",
  messagingSenderId: "139298493634",
  appId: "1:139298493634:web:b5afda57e172f04ac0d75b",
  measurementId: "G-2Y6LTSQH0X"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
