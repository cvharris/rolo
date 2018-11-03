import { ADD_CONTACT, UPDATE_CURRENT_CONTACT } from '../config/constants'
import Contact from '../lib/Contact'

// Initial State
const initialState = new Contact({})

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_CONTACT:
      return {
        ...state,
        ...action.contact
      }
    case ADD_CONTACT:
      return new Contact({})
    default:
      return state
  }
}
