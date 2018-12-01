import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAZY86RVw_54YXpEfTi_NRiVS-XBOHz28k",
  authDomain: "apptransferencia.firebaseapp.com",
  databaseURL: "https://apptransferencia.firebaseio.com",
  projectId: "apptransferencia",
  storageBucket: "apptransferencia.appspot.com",
  messagingSenderId: "1035491599835"
};
firebase.initializeApp(config);
export default firebase;
