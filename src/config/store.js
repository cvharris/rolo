import tableSorter from 'reducers/contactsTableSorter.reducer'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import contacts from '../reducers/contactsReducer'
import currentContact from '../reducers/currentContactReducer'

const configureStore = persistedState => {
  const store = createStore(
    combineReducers({
      contacts,
      currentContact,
      tableSorter
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
