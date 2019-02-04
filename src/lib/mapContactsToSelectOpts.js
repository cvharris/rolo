export default contacts => {
  return contacts.map(contact => ({
    value: contact.id,
    label: `${contact.firstName} ${contact.lastName}`
  }))
}
