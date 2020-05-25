import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDpWSyd0O1P80A7aU2RpYaBEcTtEOQF_Tw",
    authDomain: "book-worm-a7a34.firebaseapp.com",
    databaseURL: "https://book-worm-a7a34.firebaseio.com",
    projectId: "book-worm-a7a34",
    storageBucket: "book-worm-a7a34.appspot.com",
    messagingSenderId: "767729131211",
    appId: "1:767729131211:web:4fb032c79be5b94bed454e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;