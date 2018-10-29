import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addContact } from '../actions/contactsActions'
import ContactForm from '../components/ContactForm'

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
    props.history.push('/')
    dispatch(addContact(newContact))
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
