// Initial State
const initialState = {
  name: '',
  number: ''
}

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