import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  SET_FROM_STATE,
  SET_USER_CONTACTS,
  UPDATE_CONTACT
} from '../config/constants'
import firebase, { db } from '../config/firebase'

export const setUserContacts = contacts => ({
  type: SET_USER_CONTACTS,
  contacts
})

export const setFromState = state => ({
  type: SET_FROM_STATE,
  state
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

export const updateUploadedContact = contact => ({
  type: UPDATE_CONTACT,
  contact
})

export const updateContact = contact => {
  return dispatch => {
    return db
      .collection('contacts')
      .doc(contact.id)
      .set(contact.toObject())
      .then(doc =>
        dispatch({
          type: UPDATE_CONTACT,
          contact
        })
      )
  }
}

export const removeContact = contact => ({
  type: REMOVE_CONTACT,
  contact
})
