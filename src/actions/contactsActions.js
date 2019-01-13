import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  SET_USER_CONTACTS,
  UPDATE_CONTACT
} from '../config/constants'
import firebase from '../config/firebase'

export const setUserContacts = contacts => ({
  type: SET_USER_CONTACTS,
  contacts
})

export const pushContact = newContact => {
  return dispatch => {
    return firebase
      .firestore()
      .collection('contacts')
      .add(newContact)
      .then(doc => dispatch(addContact(newContact)))
  }
}

export const uploadMultipleContacts = contacts => {
  return dispatch => {
    return firebase.firestore().collection('contacts')
  }
}

export const addContact = newContact => ({
  type: ADD_CONTACT,
  newContact
})

export const updateContact = contact => ({
  type: UPDATE_CONTACT,
  contact
})

export const removeContact = contact => ({
  type: REMOVE_CONTACT,
  contact
})
