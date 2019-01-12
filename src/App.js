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
    firebase.auth().onAuthStateChanged(this.handleUserLogin)
  }

  handleUserLogin = async loggedInUser => {
    console.log(loggedInUser)
    if (loggedInUser) {
      // User is signed in.
      const user = await firebase
        .firestore()
        .collection('users')
        .doc(loggedInUser.uid)
        .get()

      const relatives = await Promise.all(
        user.get('relatives').map(relativeRef =>
          firebase
            .firestore()
            .doc(relativeRef.path)
            .get()
        )
      )
      const refCleaned = relatives.map(doc => {
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
      // convertFirestoreToJSON(normalized)
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
    } else {
      // No user is signed in.
    }
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
