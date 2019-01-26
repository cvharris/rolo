import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setCurrentContact } from '../actions/currentContactActions'
import ContactForm from '../components/ContactForm'
import { updateContact } from '../actions/contactsActions'

class EditContact extends Component {
  state = {
    fetchingContact: true
  }

  componentDidMount() {
    const { setCurrentContact, allContactsById, match } = this.props

    setCurrentContact(allContactsById[match.params.contactId], allContactsById)
    this.setState({
      fetchingContact: false
    })
  }

  render() {
    if (this.state.fetchingContact) {
      return <div>Loading...</div>
    }
    return (
      <ContactForm
        contact={this.props.contact}
        onNameUpdate={this.props.updateCurrentContactName}
        onContactSubmit={this.props.updateContact}
        submitButtonText="Save Changes"
      />
    )
  }
}

export default withRouter(
  connect(
    state => ({
      contact: state.currentContact,
      allContactsById: state.contacts.byId
    }),
    { setCurrentContact, updateContact }
  )(EditContact)
)
