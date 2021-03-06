import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDiSvRQ2iKSIccgEDrWZL0IU9aLLQr_7H4',
    authDomain: 'crud-simple-app.firebaseapp.com',
    databaseURL: 'https://crud-simple-app-default-rtdb.firebaseio.com',
    projectId: 'crud-simple-app',
    storageBucket: 'crud-simple-app.appspot.com',
    messagingSenderId: '377626521031',
    appId: '1:377626521031:web:5c3463781aa177f5b8bde2',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
