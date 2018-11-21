import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { pushContact } from '../actions/contactsActions'
import ContactForm from '../components/ContactForm'
import { db } from 'config/firebase'

class AddContact extends Component {
  render() {
    return (
      <ContactForm
        contact={this.props.newContact}
        onNameUpdate={this.props.updateCurrentContactName}
        onContactSubmit={this.props.addContact}
      />
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  addContact: newContact => {
    const readyContact = {
      ...newContact,
      spouse: db.doc(`/contacts/${newContact.id}`)
    }
    dispatch(pushContact(readyContact))
    props.history.push('/')
  }
})

export default withRouter(
  connect(
    state => ({
      newContact: state.currentContact
    }),
    mapDispatchToProps
  )(AddContact)
)
