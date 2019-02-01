import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentContact } from '../actions/currentContactActions'
import ContactForm from '../components/ContactForm'

class EditContact extends Component {
  state = {
    fetchingContact: true
  }

  componentDidMount() {
    const { setCurrentContact, allContactsById, contactId } = this.props

    setCurrentContact(allContactsById[contactId], allContactsById)
    this.setState({
      fetchingContact: false
    })
  }

  updateContact = () => {
    console.log('Update your stuff!')
  }

  render() {
    if (this.state.fetchingContact) {
      return <div>Loading...</div>
    }
    return (
      <ContactForm
        contact={this.props.contact}
        onNameUpdate={this.props.updateCurrentContactName}
        onContactSubmit={this.updateContact}
      />
    )
  }
}

export default connect(
  state => ({
    contact: state.currentContact,
    allContactsById: state.contacts.byId
  }),
  { setCurrentContact }
)(EditContact)
