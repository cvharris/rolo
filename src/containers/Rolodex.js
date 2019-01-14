import { normalize } from 'normalizr'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import { removeContact, setUserContacts } from '../actions/contactsActions'
import ContactsList from '../components/ContactsList'
import firebase, { db } from '../config/firebase'
import schema from '../config/schema'
import AddContact from './AddContact'
import EditContact from './EditContact'
import Sidebar from './Sidebar'
import UploadContacts from './UploadContacts'

class Rolodex extends Component {
  state = {
    loadingContacts: true
  }

  async componentDidMount() {
    const { updateContactsList } = this.props
    const user = await db
      .collection('users')
      .doc(firebase.auth().currentUser.uid) // TODO: convert this to a reducer of the current user
      .get()

    const relatives = await Promise.all(
      user.get('relatives').map(relativeRef => db.doc(relativeRef.path).get())
    )
    const refCleaned = relatives.map(doc => {
      const temp = { ...doc.data(), id: doc.id }
      const contact = {}
      Object.keys(temp).forEach(key => {
        if (key === 'spouse') {
          contact[key] = temp[key] ? temp[key].id : null
        } else if (key === 'parents' || key === 'children') {
          contact[key] = temp[key].map(ref => ref.id)
        } else {
          contact[key] = temp[key]
        }
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
      allIds: normalized.result.contacts,
      byId: normalized.entities.contacts
    }
    // Update state with this (not resetting store)
    updateContactsList(mappedStore)
  }

  render() {
    return (
      <div>
        <Sidebar handleLogout={this.props.handleLogout} />
        <div className="app-body">
          <Route
            exact
            path="/"
            render={() => (
              <ContactsList
                contacts={this.props.contacts}
                onRemoveContact={this.props.removeContact}
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

const mapDispatchToProps = dispatch => {
  return {
    updateContactsList: mappedStore => dispatch(setUserContacts(mappedStore)),
    removeContact: contact => {
      dispatch(removeContact(contact))
    }
  }
}

export default withRouter(
  connect(
    state => ({
      contacts: state.contacts.allIds.map(cId => state.contacts.byId[cId])
    }),
    mapDispatchToProps
  )(Rolodex)
)
