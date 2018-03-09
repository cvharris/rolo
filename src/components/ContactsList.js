import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default class ContactsList extends Component {

  render() {
    const { contacts, onRemoveContact } = this.props

    if (!contacts.length) {
      return (
        <h1>You have no contacts!</h1>
      )
    }

    return (
      <ul className="list pl0 mt0 measure center">
        {contacts.map((contact, i) => (
          <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10" key={i}>
            <div className="pl3 flex-auto">
              <span className="f6 db black-70">{contact.firstName}</span>
            </div>
            <div className="contact-actions">
              <span className="f6 link dim ph3 pv2 mb2 dib white bg-red pointer" onClick={() => onRemoveContact(contact)}>
                <FontAwesomeIcon icon="trash-alt" />
              </span>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}