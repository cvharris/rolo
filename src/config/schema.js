import { schema } from 'normalizr'

// Addresses
// const address = new schema.Entity('addresses')

// Contacts
const contact = new schema.Entity('contacts')

// Users
// const user = new schema.Entity('users', {
//   contact: contact
// })

// Families
// const family = new schema.Entity('families')
// const families = new schema.Array(family)
// family.define({ ancestors: families })

export default {
  contacts: [contact]
  // families: [family],
  // users: [user],
  // addresses: [address]
}
