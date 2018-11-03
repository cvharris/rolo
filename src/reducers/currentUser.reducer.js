import { LOGIN_USER, LOGOUT_USER, SET_CURRENT_USER } from '../config/constants'

// Initial State
export const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
    case SET_CURRENT_USER:
      return action.user
    case LOGOUT_USER:
      return initialState
    default:
      return state
  }
}
