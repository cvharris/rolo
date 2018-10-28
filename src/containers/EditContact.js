import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateContact } from '../actions/contactListActions'
import { updateCurrentContact } from '../actions/currentContactActions'
import ContactForm from '../components/ContactForm'

class EditContact extends Component {
  render() {
    return (
      <ContactForm
        contact={this.props.contact}
        onNameUpdate={this.props.updateCurrentContactName}
        onContactSubmit={this.props.addContact}
      />
    )
  }
}

export default connect(
  state => ({
    contact: state.currentContact
  }),
  { updateContact, updateCurrentContact }
)(EditContact)
