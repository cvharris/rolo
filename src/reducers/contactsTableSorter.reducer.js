import { SORT_TABLE } from 'config/constants'
import sortContacts from 'lib/sortContacts'
import { allContacts } from 'reducers/contactsReducer'
import { createSelector } from 'reselect'

const initialState = {
  sortOrder: 'lastName',
  reverse: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SORT_TABLE:
      return {
        sortOrder: action.sortBy,
        reverse: state.sortOrder === action.sortBy ? !state.reverse : false
      }
    default:
      return state
  }
}

const sortSelector = state => state.tableSorter.sortOrder
const directionSelector = state => state.tableSorter.reverse

export const sortedContacts = createSelector(
  [allContacts, sortSelector, directionSelector],
  sortContacts
)
