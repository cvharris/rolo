import {
  ADD_ADDRESS,
  REMOVE_ADDRESS,
  UPDATE_ADDRESS
} from '../config/constants'

// Initial State
export const initialState = {
  allIds: [],
  byId: {}
}

// Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ADDRESS:
      return {
        allIds: [...state.allIds, payload.id],
        byId: { ...state.byId, [payload.id]: payload }
      }
    case REMOVE_ADDRESS:
      const { [payload]: deletedAddress, ...newState } = state.byId
      return {
        allIds: state.allIds.filter(addressId => addressId !== payload),
        byId: newState
      }
    case UPDATE_ADDRESS:
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: payload }
      }
    default:
      return state
  }
}
