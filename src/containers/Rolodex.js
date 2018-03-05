import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContactsList from '../components/ContactsList'
import ContactForm from '../components/ContactForm'
import { updateContactName, addContact, removeContact } from '../actions/currentContactActions';

class Rolodex extends Component {
  render() {
    return (
      <div>
        <ContactForm newContact={this.props.newContact} onNameUpdate={this.props.updateCurrentContactName} onContactSubmit={this.props.addContact} />
        <ContactsList contacts={this.props.contacts} onRemoveContact={this.props.removeContact} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentContactName: (name) => {
      dispatch(updateContactName(name))
    },
    addContact: (newContact) => {
      dispatch(addContact(newContact))
    },
    removeContact: (contact) => {
      dispatch(removeContact(contact))
    }
  }
}

export default connect(state => ({
  contacts: state.contactList.contacts,
  newContact: state.currentContact
}), mapDispatchToProps)(Rolodex)