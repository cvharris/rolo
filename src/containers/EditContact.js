import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setCurrentContact } from '../actions/currentContactActions'
import ContactForm from '../components/ContactForm'

class EditContact extends Component {
  state = {
    fetchingContact: true
  }

  componentDidMount() {
    this.props.setCurrentContact(
      this.props.allContactsById[this.props.match.params.contactId],
      this.props.allContactsById
    )
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

export default withRouter(
  connect(
    state => ({
      contact: state.currentContact,
      allContactsById: state.contacts.byId
    }),
    { setCurrentContact }
  )(EditContact)
)
