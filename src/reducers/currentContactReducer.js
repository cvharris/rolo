import Contact from "../lib/Contact";

// Initial State
const initialState = new Contact({})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CONTACT_NAME':
      return {
        ...state,
        name: action.payload
      }
    case 'ADD_CONTACT':
      return initialState
    default:
      return state
  }
}