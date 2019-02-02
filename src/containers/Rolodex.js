import { Router } from '@reach/router'
import LoadingScreen from 'components/LoadingScreen'
import Contact from 'lib/Contact'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTypeAheadOptions } from 'reducers/contactsReducer'
import {
  removeContact,
  setUserContacts,
  updateContact as editContactInfo
} from '../actions/contactsActions'
import firebase, { db } from '../config/firebase'
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
    this.getAllContactsForUser()
  }

  getAllContactsForUser = async () => {
    const { updateContactsList } = this.props
    try {
      const user = await db
        .collection('users')
        .doc(firebase.auth().currentUser.uid) // TODO: convert this to a reducer of the current user
        .get()

      const relatives = await Promise.all(
        user.get('relatives').map(relativeRef => db.doc(relativeRef.path).get())
      )
      const contacts = relatives.reduce(
        (newState, doc) => {
          const contact = new Contact({ ...doc.data(), id: doc.id })
          newState.byId[contact.id] = contact
          newState.allIds.push(contact.id)
          return newState
        },
        { allIds: [], byId: {} }
      )
      // Update state with this (not resetting store)
      updateContactsList(contacts)
    } catch (e) {
      // TODO: Show loading error message
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
    contactsById: state.contacts.byId,
    typeaheadOptions: getTypeAheadOptions(state)
  }),
  {
    updateContactsList: setUserContacts,
    updateContact: editContactInfo,
    removeContact
  }
)(Rolodex)
