// src/firebase.js
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDpqdH_efoUh5_BzzY3dJkG9ORVWo4kC-E',
  authDomain: 'rolo-1014.firebaseapp.com',
  databaseURL: 'https://rolo-1014.firebaseio.com',
  projectId: 'rolo-1014',
  storageBucket: 'rolo-1014.appspot.com',
  messagingSenderId: '35495241567'
}

firebase.initializeApp(config)

export default firebase
