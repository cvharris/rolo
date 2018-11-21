import allContacts from './allContacts.json'
import getAllRelatives from './getAllRelatives'

const getContact = (firstName, lastName) => {
  const contact = allContacts.find(
    con => con.firstName === firstName && con.lastName === lastName
  )
  if (!contact) {
    throw new Error('No contact found by that name')
  }
  return contact
}

it('gets all relatives for Charlie Harris', () => {
  const contact = getContact('Charlie', 'Harris')
  const result = getAllRelatives(contact)

  expect(result.length).toBe(49)
})

it('gets relatives for Anne Flannery', () => {
  const contact = getContact('Anne', 'Flannery')
  const result = getAllRelatives(contact)
  const notARelative = getContact('Sally', 'Barnowski')

  expect(result.length).toBe(5)
  expect(result).not.toContain(notARelative.id)
})

it('gets relatives for Dave Keller', () => {
  const contact = getContact('Dave', 'Keller')
  const result = getAllRelatives(contact)
  const notARelative = getContact('John', 'Blaida')

  expect(result.length).toBe(38)
  expect(result).not.toContain(notARelative.id)
})
