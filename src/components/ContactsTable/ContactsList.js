import Contact from 'lib/Contact'
import contactFields from 'lib/contactFields'
import isContactInvalid from 'lib/isContactInvalid'
import React from 'react'
import ContactListHeader from './ContactListHeader'
import ContactRow from './ContactRow'

const ContactsList = ({
  contacts,
  addresses,
  updateContact,
  sortOrder,
  reverse,
  sortContacts
}) => {
  if (!contacts.length) {
    return <h1>You have no contacts!</h1>
  }

  const invalidContacts = contacts.reduce((map, contact) => {
    if (isContactInvalid(contact)) {
      map[contact.id] = true
    }
    return map
  }, {})

  return (
    <div className="rolo-table">
      <div className="rolo-table-header pt2 tc fw6 bg-gold pb2 underline">
        <div className="header-col" />
        {Object.keys(contactFields).map((field, i) => (
          <ContactListHeader
            field={field}
            label={contactFields[field]}
            sorting={sortOrder}
            reverse={reverse}
            handleSorting={sortContacts}
            key={i}
          />
        ))}
      </div>
      <div className="rolo-table-body">
        {contacts.map(contact => (
          <ContactRow
            contact={contact}
            address={addresses[contact.address]}
            key={contact.id}
            invalid={invalidContacts[contact.id]}
            updateContact={(f, v) =>
              updateContact(new Contact({ ...contact, [f]: v }))
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ContactsList
