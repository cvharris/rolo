import contactList from '../reducers/contactListReducer'
import currentContact from '../reducers/currentContactReducer'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'
import { saveState } from './localStorage'

const configureStore = (persistedState) => {
  const store = createStore(combineReducers({
    contactList,
    currentContact
  }), persistedState, composeWithDevTools())

  store.subscribe(throttle(() => {
    saveState({
      contactList: store.getState().contactList
    })
  }, 1000))

  return store
}

export default configureStore
