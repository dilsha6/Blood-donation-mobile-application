import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAd5fa6lGRTq0L5D5H-op6uoItcJe2azT8",
  authDomain: "reddrop-658ef.firebaseapp.com ",
  projectId: "reddrop-658ef",
  storageBucket: "reddrop-658ef.appspot.com",
  messagingSenderId: "1094924404600",
  appId: "1:1094924404600:android:48709b72ac8a716f4cea8d",
  databaseURL:"reddrop-658ef-default-rtdb.asia-southeast1.firebasedatabase.app"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
