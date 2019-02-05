import addresses from 'reducers/addresses.reducer'
import contacts from 'reducers/contactsReducer'
import tableSorter from 'reducers/contactsTableSorter.reducer'
import currentContact from 'reducers/currentContactReducer'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const configureStore = persistedState => {
  const store = createStore(
    combineReducers({
      contacts,
      currentContact,
      tableSorter,
      addresses
    }),
    persistedState,
    compose(
      applyMiddleware(thunk),
      composeWithDevTools()
    )
  )

  return store
}

export default configureStore
