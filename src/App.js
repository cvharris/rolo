import React, { Component } from 'react'
import LoadingScreen from './components/LoadingScreen'
import firebase from './config/firebase'
import Login from './containers/Login'
import Rolodex from './containers/Rolodex'

export default class RoloApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingFirebaseSession: true,
      isAuthenticated: false
    }
  }

  componentDidMount() {
    // Try to fetch user record
    // If unauthenticated, show login screen
    firebase.auth().onAuthStateChanged(this.handleUserLogin)
  }

  handleUserLogin = async loggedInUser => {
    this.setState({
      loadingFirebaseSession: false,
      isAuthenticated: !!loggedInUser
    })
  }

  // TODO: Potentially create a context for handling logout instead
  handleUserLogout = async () => {
    await firebase.auth().signOut()
    this.setState({
      loadingFirebaseSession: false,
      isAuthenticated: false
    })
  }

  render() {
    const { loadingFirebaseSession, isAuthenticated } = this.state

    if (loadingFirebaseSession) {
      return <LoadingScreen />
    }

    if (!isAuthenticated) {
      return <Login handleLogin={this.handleUserLogin} />
    }

    return <Rolodex handleLogout={this.handleUserLogout} />
  }
}
