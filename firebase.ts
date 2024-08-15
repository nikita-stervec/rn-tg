import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm558H6TkgXatOOxJwsQl-mdTriKYANlU",
  authDomain: "rn-tg-zxc.firebaseapp.com",
  projectId: "rn-tg-zxc",
  storageBucket: "rn-tg-zxc.appspot.com",
  messagingSenderId: "767827671392",
  appId: "1:767827671392:web:58346e3593b0e085e5c605",
  measurementId: "G-XDQHZ6GV6M",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
