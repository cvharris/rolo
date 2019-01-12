import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import { removeContact } from '../actions/contactsActions'
import ContactsList from '../components/ContactsList'
import AddContact from './AddContact'
import EditContact from './EditContact'
import Sidebar from './Sidebar'
import UploadContacts from './UploadContacts'

class Rolodex extends Component {
  render() {
    return (
      <div>
        <Sidebar />
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
