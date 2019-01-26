import { db } from 'config/firebase'
import Contact from 'lib/Contact'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { pushContact } from '../actions/contactsActions'
import ContactForm from '../components/ContactForm'

class AddContact extends Component {
  render() {
    return (
      <ContactForm
        contact={this.props.newContact}
        onNameUpdate={this.props.updateCurrentContactName}
        onContactSubmit={this.props.addContact}
        submitButtonText="Create New Contact!"
      />
    )
  }
}

AddContact.propTypes = {
  newContact: PropTypes.instanceOf(Contact),
  onNameUpdate: PropTypes.func,
  onContactSubmit: PropTypes.func
}

const mapDispatchToProps = (dispatch, props) => ({
  addContact: newContact => {
    const readyContact = {
      ...newContact,
      spouse: db.doc(`/contacts/${newContact.spouse.value}`),
      children: db.doc(`/contacts/${newContact.children.value}`)
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
