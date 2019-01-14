import Contact from 'lib/Contact'
import contactFields from 'lib/contactFields'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ContactRow from './ContactRow'

class ContactsList extends Component {
  updateContact = (field, val) => {
    console.log(field, val)
  }

  render() {
    const { contacts } = this.props

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
              key={contact.id}
              updateContact={this.updateContact}
            />
          ))}
        </div>
      </div>
    )
  }
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.instanceOf(Contact))
}

export default ContactsList
