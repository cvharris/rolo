import {
  ADD_ADDRESS,
  REMOVE_ADDRESS,
  SET_ADDRESSES,
  UPDATE_ADDRESS
} from '../config/constants'

// Initial State
export const initialState = {
  allIds: [],
  byId: {}
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESSES:
      return action.addressState
    case ADD_ADDRESS:
      return {
        allIds: [...state.allIds, action.address.toHash()],
        byId: { ...state.byId, [action.address.toHash()]: action.address }
      }
    case REMOVE_ADDRESS:
      const {
        [action.address.toHash()]: deletedAddress,
        ...newState
      } = state.byId
      return {
        allIds: state.allIds.filter(
          addressId => addressId !== action.address.toHash()
        ),
        byId: newState
      }
    case UPDATE_ADDRESS:
      return {
        ...state,
        byId: { ...state.byId, [action.address.toHash()]: action.address }
      }
    default:
      return state
  }
}

// Getters
export const allAddresses = state =>
  state.addresses.allIds.map(addressId => state.addresses.byId[addressId])
