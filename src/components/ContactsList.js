import firebase from 'config/firebase'
import contactFields from 'lib/contactFields'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ContactsList extends Component {
  editContent = e => {
    console.log('You are going to edit!')
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
          {contacts.map((contact, i) => (
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
              {Object.keys(contactFields).map((key, j) => (
                <div className="contact-col pl3 flex-auto" key={j}>
                  <span className="f6 db black-70">
                    {contact[key] instanceof firebase.firestore.Timestamp
                      ? contact[key].toDate().toDateString()
                      : contact[key]}
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
