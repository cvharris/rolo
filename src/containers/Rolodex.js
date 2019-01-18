import LoadingScreen from 'components/LoadingScreen';
import Contact from 'lib/Contact';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { getTypeAheadOptions } from 'reducers/contactsReducer';
import { removeContact, setUserContacts, updateContact as editContactInfo } from '../actions/contactsActions';
import ContactsList from '../components/ContactsTable/ContactsList';
import firebase, { db } from '../config/firebase';
import AddContact from './AddContact';
import EditContact from './EditContact';
import Sidebar from './Sidebar';
import UploadContacts from './UploadContacts';

class Rolodex extends Component {
  state = {
    loadingContacts: true
  }

  async componentDidMount() {
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
    const {
      handleLogout,
      contacts,
      typeaheadOptions,
      contactsById,
      removeContact,
      updateContact
    } = this.props

    if (loadingContacts) {
      return <LoadingScreen />
    }

    return (
      <div id="app">
        <Sidebar handleLogout={handleLogout} />
        <div className="app-body">
          <Route
            exact
            path="/"
            render={() => (
              <ContactsList
                contacts={contacts}
                contactsMap={contactsById}
                contactTypeaheadOptions={typeaheadOptions}
                onRemoveContact={removeContact}
                updateContact={updateContact}
              />
            )}
          />
          <Route path="/new-contact" component={AddContact} />
          <Route path="/edit-contact/:contactId" component={EditContact} />
          <Route path="/upload-contacts" component={UploadContacts} />
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect(
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
)
