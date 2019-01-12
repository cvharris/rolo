const getAllRelatives = require('./getAllRelatives')
const { getContact } = require('./utils')

it('gets all relatives for Charlie Harris', () => {
  const contact = getContact('Charlie', 'Harris')
  const result = getAllRelatives(contact)
  const Austin = getContact('Austin', 'Boyer')

  expect(result).toContain(Austin.id) // children of in-laws not shared with blood relatives
})

it('gets relatives for Anne Flannery', () => {
  const contact = getContact('Anne', 'Flannery')
  const result = getAllRelatives(contact)
  const notARelative = getContact('Sally', 'Barnowski')

  expect(result).not.toContain(notARelative.id)
})

it('gets relatives for Dave Keller', () => {
  const contact = getContact('Dave', 'Keller')
  const result = getAllRelatives(contact)
  const notARelative = getContact('John', 'Blaida')

  expect(result).not.toContain(notARelative.id)
})
