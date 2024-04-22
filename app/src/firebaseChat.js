import firebase from 'firebase'
// import "firebase/auth";
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyAJzr1dzrLc7lWrz3rAra1korIL8kFmk44',
  authDomain: 'evergreen-da7ee.firebaseapp.com',
  databaseURL: 'https://evergreen-da7ee.firebaseio.com',
  projectId: 'evergreen-da7ee',
  storageBucket: 'evergreen-da7ee.appspot.com',
  messagingSenderId: '866300287049',
  appId: '1:866300287049:web:3c2438f12c10b427074798',
  measurementId: 'G-Z4TF42NP8G',
}
firebase.initializeApp(firebaseConfig)
// export const auth = firebase.auth();

export default firebase
