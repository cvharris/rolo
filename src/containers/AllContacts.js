import ContactsList from 'components/ContactsTable/ContactsList';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateContact as editContactInfo } from '../actions/contactsActions';
import ContactListContext from './ContactListContext';

class AllContacts extends Component {
  componentDidMount() {
    const { contactsAllIds, contactsById } = this.props

    this.context.switchContexts(
      contactsAllIds,
      contactsById,
      this.onUpdateContact
    )
  }

  onUpdateContact = contact => {
    const { contactsById, updateContacts } = this.context

    const newContactMap = { ...contactsById, [contact.id]: contact }
    updateContacts(newContactMap)
    this.props.updateContact(contact)
  }

  render() {
    return <ContactsList />
  }
}

AllContacts.contextType = ContactListContext

export default connect(
  state => ({
    contactsAllIds: state.contacts.allIds,
    contactsById: state.contacts.byId
  }),
  {
    updateContact: editContactInfo
  }
)(AllContacts)
