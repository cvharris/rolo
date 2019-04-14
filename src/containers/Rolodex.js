import { Router } from '@reach/router'
import { setAllAddresses } from 'actions/addressesActions'
import {
  removeContact,
  setFromState,
  setUserContacts,
  updateContact as editContactInfo
} from 'actions/contactsActions'
import { setCurrentUser as gotUser } from 'actions/currentUser.actions'
import LoadingScreen from 'components/LoadingScreen'
import firebase, { db } from 'config/firebase'
import Address from 'lib/Address'
import Contact from 'lib/Contact'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddContact from './AddContact'
import AllContacts from './AllContacts'
import EditContact from './EditContact'
import Sidebar from './Sidebar'
import UploadContacts from './UploadContacts'

class Rolodex extends Component {
  state = {
    loadingContacts: true
  }

  componentDidMount() {
    const { setFromState } = this.props
    setFromState('all')
    this.getAllContactsForUser()
  }

  getAllContactsForUser = async () => {
    const { updateContactsList, setCurrentUser } = this.props
    try {
      const userSnap = await db
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()

      if (!userSnap.exists) {
        this.setState({
          loadingContacts: false
        })
        return
      }

      const user = userSnap.data()

      setCurrentUser(user)

      const relatives = await Promise.all(
        user.uploaded.map(relativeRef => db.doc(relativeRef.path).get())
      )
      const contactsState = relatives.reduce(
        (newState, doc) => {
          const contact = new Contact({ ...doc.data(), id: doc.id })
          newState.byId[contact.id] = contact
          newState.allIds.push(contact.id)
          return newState
        },
        { allIds: [], byId: {} }
      )

      // Now go get addresses? Man there's gotta be a better way to handle this...
      const addressPromises = Object.values(contactsState.byId).reduce(
        (allAddresses, contact) => {
          if (contact.address) {
            allAddresses.push(contact.address.get())
          }
          return allAddresses
        },
        []
      )
      const addressSnaps = await Promise.all(addressPromises)

      const addressesState = addressSnaps.reduce(
        (addressState, doc) => {
          const address = new Address(doc.data())
          const hash = address.toHash()
          addressState.byId[hash] = address
          addressState.allIds.push(hash)
          return addressState
        },
        { allIds: [], byId: {} }
      )

      console.log(addressesState)
      // Update state with this (not resetting store)
      updateContactsList(contactsState)
      setAllAddresses(addressesState)
    } catch (e) {
      // TODO: Show loading error message
      console.error(e)
    }

    this.setState({
      loadingContacts: false
    })
  }

  render() {
    const { loadingContacts } = this.state
    const { handleLogout } = this.props

    if (loadingContacts) {
      return <LoadingScreen />
    }

    return (
      <div id="app">
        <Sidebar handleLogout={handleLogout} />
        <div className="app-body">
          <Router>
            <AllContacts path="/" onNavBack={this.getAllContactsForUser} />
            <AddContact path="new-contact" />
            <EditContact path="edit-contact/:contactId" />
            <UploadContacts path="upload-contacts" />
          </Router>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    contacts: state.contacts.allIds.map(cId => state.contacts.byId[cId]),
    contactsById: state.contacts.byId
  }),
  {
    updateContactsList: setUserContacts,
    updateContact: editContactInfo,
    setAllAddresses,
    setFromState,
    removeContact,
    setCurrentUser: gotUser
  }
)(Rolodex)
