// State
export const initialState = []

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return [...state, action.payload]
    case 'REMOVE_CONTACT':
      return state.filter(contact => contact.name !== action.payload.name)
    case 'UPDATE_CONTACT':
      return state.map(contact => contact.name === action.payload.name ? action.payload : contact)
    default:
      return state
  }
}
