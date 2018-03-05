// State
const initialState = {
  contacts: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: state.contacts = [...state.contacts, action.payload]
      }
    case 'REMOVE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.name !== action.payload.name)
      }
    default:
      return state
  }
}
