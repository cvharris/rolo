import React, { Component } from 'react'
import contactFields from '../lib/contactFields'

export default class ContactsList extends Component {
  render() {
    const { contacts } = this.props

    if (!contacts.length) {
      return <h1>You have no contacts!</h1>
    }

    return (
      <div className="rolo-table">
        <div
          className="rolo-table-header"
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
            <div
              className="contact-row items-center lh-copy pa3 ph0-l bb b--black-10"
              key={i}
              style={{
                gridTemplateColumns: `repeat(${
                  Object.keys(contactFields).length
                }, 1fr)`
              }}
            >
              {Object.keys(contactFields).map((key, j) => (
                <div className="contact-col pl3 flex-auto" key={j}>
                  <span className="f6 db black-70">{contact[key]}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
