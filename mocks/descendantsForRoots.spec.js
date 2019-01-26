const descendantsForRoots = require('./descendantsForRoots')
const { getContact } = require('./utils')

it('gets all children for roots without their spouse', () => {
  const contact = getContact('Anne', 'Flannery')
  const result = descendantsForRoots([contact])

  expect(result.length).toBe(4)
})

it('gets all children for roots', () => {
  const contact = getContact('Anne', 'Flannery')
  const spouse = getContact('Michael', 'Flannery')
  const result = descendantsForRoots([contact, spouse])

  expect(result.length).toBe(5)
})
