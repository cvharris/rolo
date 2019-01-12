const ancestorsForContacts = require('./ancestorsForContacts')
const { getContact } = require('./utils')

it('Returns the contact if they have no ancestors', () => {
  const contact = getContact('Velda', 'Keller')
  const results = ancestorsForContacts([contact])

  expect(results.length).toBe(1)
})

it("Returns just the contact's parents if they have parents but no spouse", () => {
  const contact = getContact('James', 'Flannery')
  const results = ancestorsForContacts([contact])

  expect(results.length).toBe(3)
})

it('Returns all ancestors for a contact with no parents but has a spouse with parents', () => {
  const contact = getContact('Vicki', 'Keller')
  const results = ancestorsForContacts([contact])

  expect(results.length).toBe(2)
})

it('Returns all the ancestors for a contact and their spouse', () => {
  const contact = getContact('Nina', 'Harris')
  const results = ancestorsForContacts([contact])

  expect(results.length).toBe(8)
})
