import { updateContact as editContactInfo } from 'actions/contactsActions'
import { sortContactsBy } from 'actions/contactsTableSorterActions'
import ContactsList from 'components/ContactsTable/ContactsList'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortedContacts } from 'reducers/contactsTableSorter.reducer'

class AllContacts extends Component {
  onUpdateContact = contact => {
    this.props.updateContact(contact)
  }

  render() {
    const {
      contacts,
      sortOrder,
      reverse,
      sortContactsBy,
      updateContact
    } = this.props

    return (
      <ContactsList
        contacts={contacts}
        sortOrder={sortOrder}
        reverse={reverse}
        updateContact={updateContact}
        sortContacts={sortContactsBy}
      />
    )
  }
}

export default connect(
  state => ({
    contacts: sortedContacts(state),
    sortOrder: state.tableSorter.sortOrder,
    reverse: state.tableSorter.reverse
  }),
  {
    sortContactsBy,
    updateContact: editContactInfo
  }
)(AllContacts)
