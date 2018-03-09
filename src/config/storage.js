import firebase from './firebase'

export const loadState = () => {
  firebase.database().ref().child('contacts').on('value', (snapshot) => {
    return snapshot.val()
  })
}

export const saveState = (state) => {
  firebase.database().ref().child('contacts').set(state)
}
