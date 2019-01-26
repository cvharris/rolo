const fs = require('fs')
const uniq = require('lodash/uniq')
const uniqBy = require('lodash/uniqBy')
const allContacts = require('./allContacts.json')
const getFamilyForContact = require('./getFamilyForContact')
const getAllRelativesForContactId = getFamilyForContact.getAllRelativesForContactId
const { getContact } = require('./utils')

xit('gets all relatives for Charlie Harris', () => {
  const contact = getContact('Maura', 'Harris')
  const result = getFamilyForContact(contact)

  console.log(result)
  expect(true).toBeTruthy()
})

xit('gets family for Nina Harris', () => {
  const contact = getContact('Nina', 'Harris')
  const result = getFamilyForContact(contact)

  expect(result.parents).toContain(contact.id)
  expect(result.children.length).toBe(2)
  expect(result.grandparents.length).toBe(5)
})

xit('gets all families for all contacts', () => {
  const families = allContacts.reduce(
    (all, con) =>
      !con.spouse && !con.children.length
        ? all
        : [...all, getFamilyForContact(con)],
    []
  )
  const familyList = JSON.parse(
    fs.readFileSync(`${__dirname}/allFamilies.json`)
  )

  const uniqFamilies = uniqBy(families, 'id')
  const everyContact = uniq(
    uniqFamilies.reduce((contacts, fam) => {
      return [...contacts, ...fam.parents, ...fam.children]
    }, [])
  )

  // console.log(
  //   allContacts
  //     .filter(con => !everyContact.find(acon => acon === con.id))
  //     .map(con => con.id)
  // )
  expect(familyList.length).toBe(uniqFamilies.length)
  expect(everyContact.length).toBe(allContacts.length)
})

xit('gets all relatives for a contact id from list of families', () => {
  const contactId = getContact('Charlie', 'Harris').id
  const result = getAllRelativesForContactId(contactId)

  expect(result.length).toBe(49)
})
