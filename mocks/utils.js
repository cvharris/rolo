const allContacts = require('./allContacts.json')

exports.getContact = (firstName, lastName) => {
  const contact = allContacts.find(
    con => con.firstName === firstName && con.lastName === lastName
  )
  if (!contact) {
    throw new Error('No contact found by that name')
  }
  return contact
}

exports.getContactById = contactId => {
  return allContacts.find(con => con.id === contactId)
}
