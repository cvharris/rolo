import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import { removeContact } from '../actions/contactsActions'
import ContactsList from '../components/ContactsList'
import AddContact from './AddContact'
import EditContact from './EditContact'
import Sidebar from './Sidebar'

class Rolodex extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div>
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
          <Route path="/edit-contact/:contactName" component={EditContact} />
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
      contacts: state.contacts
    }),
    mapDispatchToProps
  )(Rolodex)
)
