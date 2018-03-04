import contacts from '../reducers/contactsReducer'
import { combineReducers, createStore } from 'redux'
import throttle from 'lodash/throttle'
import { saveState } from './storage'

const configureStore = (persistedState) => {
  const store = createStore(combineReducers({
    contacts
  }), {
    contacts: {
      contacts: persistedState,
    },
  })

  store.subscribe(throttle(() => {
    saveState(store.getState().contacts.contacts)
  }, 1000))

  return store
}

export default configureStore
