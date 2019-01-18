import Contact from 'lib/Contact';
import contactFields from 'lib/contactFields';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ContactRow from './ContactRow';

class ContactsList extends Component {
  updateContact = (contact, field, val) => {
    const { updateContact } = this.props
    const updatedContact = new Contact({ ...contact, [field]: val })
    updateContact(updatedContact)
  }

  render() {
    const { contacts, contactTypeaheadOptions, contactsMap } = this.props

    if (!contacts.length) {
      return <h1>You have no contacts!</h1>
    }

    return (
      <div className="rolo-table">
        <div className="rolo-table-header pt2 tc fw6 bg-gold pb2 underline">
          <div className="header-col" />
          {Object.values(contactFields).map((header, i) => (
            <div className="header-col" key={i}>
              {header}
            </div>
          ))}
        </div>
        <div className="rolo-table-body">
          {contacts.map(contact => (
            <ContactRow
              contact={contact}
              contactsMap={contactsMap}
              key={contact.id}
              contactTypeaheadOptions={contactTypeaheadOptions}
              updateContact={(f, v) => this.updateContact(contact, f, v)}
            />
          ))}
        </div>
      </div>
    )
  }
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.instanceOf(Contact)).isRequired,
  contactTypeaheadOptions: PropTypes.array.isRequired,
  contactsMap: PropTypes.object,
  updateContact: PropTypes.func.isRequired
}

export default ContactsList
