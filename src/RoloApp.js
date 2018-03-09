import React, { Component } from 'react'
import firebase from './config/firebase'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './config/store'
import Rolodex from './containers/Rolodex'
import { loadState } from './config/localStorage';

export default class RoloApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStoreLoading: true,
      store: null,
    }
    this.stateRef = firebase.database().ref().child('contacts')
  }

  componentWillMount() {
    // this.listenForState(this.stateRef)
    const persistedState = loadState()
    this.setState({
      store: configureStore(persistedState),
      isStoreLoading: false,
    })
  }

  listenForState(stateRef) {
    stateRef.on('value', (snapshot) => {
      if (snapshot) {
        this.setState({
          store: configureStore(snapshot.val() ? snapshot.val() : []),
          isStoreLoading: false
        })
        stateRef.off('value')
      }
    })
  }

  render() {
    if (this.state.isStoreLoading) {
      return (
        <div>Loading...</div>
      )
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
