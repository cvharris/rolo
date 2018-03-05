import contactList from '../reducers/contactListReducer'
import currentContact from '../reducers/currentContactReducer'
import { combineReducers, createStore } from 'redux'
import throttle from 'lodash/throttle'
import { saveState } from './storage'

const configureStore = (persistedState) => {
  const store = createStore(combineReducers({
    contactList,
    currentContact
  }), {
      contactList: {
        contacts: persistedState,
      },
    })

  store.subscribe(throttle(() => {
    saveState(store.getState().contactList.contacts)
  }, 1000))

  return store
}

export default configureStore
