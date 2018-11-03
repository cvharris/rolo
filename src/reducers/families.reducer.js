import { ADD_FAMILY, REMOVE_FAMILY, UPDATE_FAMILY } from '../config/constants'

// Initial State
export const initialState = {
  allIds: [],
  byId: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FAMILY:
      return {
        allIds: [...state.allIds, action.family.id],
        byId: { ...state.byId, [action.family.id]: action.family }
      }
    case REMOVE_FAMILY:
      const { [action.family]: deletedFamily, ...newState } = state.byId
      return {
        allIds: state.allIds.filter(familyId => familyId !== action.family),
        byId: newState
      }
    case UPDATE_FAMILY:
      return {
        ...state,
        byId: { ...state.byId, [action.family.id]: action.family }
      }
    default:
      return state
  }
}
