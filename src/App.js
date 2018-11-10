import { normalize } from 'normalizr'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import firebase from './config/firebase'
import schema from './config/schema'
import configureStore from './config/store'
import Rolodex from './containers/Rolodex'

export default class RoloApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStoreLoading: true,
      store: null
    }
  }

  componentDidMount() {
    // Try to fetch user record
    // If unauthenticated, show login screen
    firebase
      .firestore()
      .collection('contacts')
      .get()
      .then(snapshot => {
        const refCleaned = snapshot.docs.map(doc => {
          const temp = { ...doc.data(), id: doc.id }
          const contact = {}
          Object.keys(temp).forEach(key => {
            contact[key] =
              temp[key] instanceof firebase.firestore.DocumentReference
                ? temp[key].id
                : temp[key]
          })
          return contact
        })
        const normalized = normalize(
          {
            contacts: refCleaned
          },
          schema
        )
        const mappedStore = {
          contacts: {
            allIds: normalized.result.contacts,
            byId: normalized.entities.contacts
          }
        }
        this.setState({
          store: configureStore(mappedStore),
          isStoreLoading: false
        })
      })
  }

  render() {
    if (this.state.isStoreLoading) {
      return <div>Loading...</div>
    }

    return (
      <Provider store={this.state.store}>
        <BrowserRouter>
          <Rolodex />
        </BrowserRouter>
      </Provider>
    )
  }
}
