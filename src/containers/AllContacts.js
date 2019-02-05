import { updateContact as editContactInfo } from 'actions/contactsActions'
import { sortContactsBy } from 'actions/contactsTableSorterActions'
import ContactsList from 'components/ContactsTable/ContactsList'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortedContacts } from 'reducers/contactsTableSorter.reducer'

class AllContacts extends Component {
  componentDidMount() {
    const { onNavBack } = this.props
    onNavBack()
  }

  onUpdateContact = contact => {
    this.props.updateContact(contact)
  }

  render() {
    // TODO: Render a loading spinner when waiting to get contacts again
    const {
      contacts,
      addresses,
      sortOrder,
      reverse,
      sortContactsBy,
      updateContact
    } = this.props

    return (
      <ContactsList
        contacts={contacts}
        addresses={addresses}
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
    addresses: state.addresses.byId,
    sortOrder: state.tableSorter.sortOrder,
    reverse: state.tableSorter.reverse
  }),
  {
    sortContactsBy,
    updateContact: editContactInfo
  }
)(AllContacts)
