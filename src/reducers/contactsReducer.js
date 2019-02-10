import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  SET_FROM_STATE,
  SET_USER_CONTACTS,
  UPDATE_CONTACT
} from '../config/constants'

// Initial State
export const initialState = {
  allIds: [],
  byId: {},
  fromState: ''
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_CONTACTS:
      return {
        ...state,
        ...action.contacts
      }
    case SET_FROM_STATE:
      return {
        ...state,
        fromState: action.state
      }
    case ADD_CONTACT:
      return {
        ...state,
        allIds: [...state.allIds, action.newContact.id],
        byId: { ...state.byId, [action.newContact.id]: action.newContact }
      }
    case REMOVE_CONTACT:
      const { [action.contact]: deletedContact, ...newState } = state.byId
      return {
        ...state,
        allIds: state.allIds.filter(contactId => contactId !== action.contact),
        byId: newState
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        byId: { ...state.byId, [action.contact.id]: action.contact }
      }
    default:
      return state
  }
}

// Getters
export const allContacts = state =>
  state.contacts.allIds.map(contactId => state.contacts.byId[contactId])
