import React, { Component } from 'react'

export default class ContactsList extends Component {

  render() {
    const { contacts } = this.props
    return (
      <ul>
        {contacts.map((contact, i) => (
          <li key={i}>{contact.name}</li>
        ))}
      </ul>
    )
  }
}