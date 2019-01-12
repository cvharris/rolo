import firebase from 'config/firebase';
import Contact from 'lib/Contact';
import contactFields from 'lib/contactFields';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';

class ContactsList extends Component {
  renderContactRow = field => {
    if (!field) {
      return field
    }
    switch (field.constructor) {
      case firebase.firestore.Timestamp:
        return field.toDate().toDateString()
      case Array:
        return field.join(', ')
      default:
        return field
    }
  }

  render() {
    const { contacts } = this.props

    if (!contacts.length) {
      return <h1>You have no contacts!</h1>
    }

    return (
      <div className="rolo-table">
        <div
          className="rolo-table-header pt2 tc fw6 bg-gold pb2 underline"
          style={{
            gridTemplateColumns: `repeat(${
              Object.keys(contactFields).length
            }, 1fr)`
          }}
        >
          {Object.values(contactFields).map((header, i) => (
            <div className="header-col" key={i}>
              {header}
            </div>
          ))}
        </div>
        <div className="rolo-table-body">
          {contacts.map(contact => (
            <Link
              className="contact-row items-center lh-copy pa3 ph0-l bb b--black-30 tc"
              key={contact.id}
              style={{
                gridTemplateColumns: `repeat(${
                  Object.keys(contactFields).length
                }, 1fr)`
              }}
              to={`/edit-contact/${contact.id}`}
            >
              {Object.keys(contactFields).map((field, i) => (
                <div className="contact-col pl3 flex-auto" key={i}>
                  <span className="f6 db black-70">
                    {this.renderContactRow(contact[field])}
                  </span>
                </div>
              ))}
            </Link>
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
