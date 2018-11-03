import { ADD_CONTACT, REMOVE_CONTACT, UPDATE_CONTACT } from '../config/constants';

// Initial State
export const initialState = {
  allIds: [],
  byId: {}
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        allIds: [...state.allIds, action.newContact.id],
        byId: { ...state.byId, [action.newContact.id]: action.newContact }
      }
    case REMOVE_CONTACT:
      const { [action.contact]: deletedContact, ...newState } = state.byId
      return {
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
