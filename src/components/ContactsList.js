import firebase from 'config/firebase'
import contactFields from 'lib/contactFields'
import React, { Component } from 'react'

export default class ContactsList extends Component {
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
            <div
              className="contact-row items-center lh-copy pa3 ph0-l bb b--black-30 tc"
              key={contact.id}
              style={{
                gridTemplateColumns: `repeat(${
                  Object.keys(contactFields).length
                }, 1fr)`
              }}
            >
              {Object.keys(contactFields).map((field, i) => (
                <div className="contact-col pl3 flex-auto" key={i}>
                  <span className="f6 db black-70">
                    {contact[field] instanceof firebase.firestore.Timestamp
                      ? contact[field].toDate().toDateString()
                      : contact[field]}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
