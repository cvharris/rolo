import { ContactListConsumer } from 'containers/ContactListContext'
import Contact from 'lib/Contact'
import contactFields from 'lib/contactFields'
import React from 'react'
import ContactRow from './ContactRow'

const ContactsList = () => {
  const onUpdateContact = (contact, field, val, updateContact) => {
    const updatedContact = new Contact({ ...contact, [field]: val })
    updateContact(updatedContact)
  }

  return (
    <ContactListConsumer>
      {({ contactsAllIds, contactsById, updateContact }) => {
        if (!contactsAllIds.length) {
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
              {contactsAllIds.map(cId => {
                const contact = contactsById[cId]
                return (
                  <ContactRow
                    contact={contact}
                    key={cId}
                    updateContact={(f, v) =>
                      onUpdateContact(contact, f, v, updateContact)
                    }
                  />
                )
              })}
            </div>
          </div>
        )
      }}
    </ContactListConsumer>
  )
}

export default ContactsList
