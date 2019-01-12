const fs = require('fs')
const uniq = require('lodash/uniq')
const Family = require('../lib/Family')
const allContacts = require('./allContacts.json')
const allFamilies = require('./allFamilies.json')

// step 1: form families
// family: contact with spouse and their children
const getRelativesForContact = contact => {
  // We use families to climb the tree to the top before getting all relatives thru children
  // But our entry point is contact, so we need to identify an initial family
  // If our contact is a parent (has spouse or children) then we get their nuclear family
  // If our contact is a child, we need to get the set of families they belong to (in the case of divorced parents)
  // Once we have the families we get all ancestor families by recursively climbing until family with no grandparents
  // From these families we traverse downward, adding families to a set until no families
  // if (contact.children.length || contact.spouse) {
  // }
}

// contact onCreate, create new user with email and/or phone number
// contact onDelete, delete user with email and/or phone number

exports.onContactWrite = contact => {
  // Get family the contact is a parent of
  if (contact.spouse || contact.children.length) {
    const familyAsParent = getFamilyForParentId(contact.id)
    // if family doesn't exist, we need to create it
    if (!familyAsParent) {
      createFamilyForContact(contact)
    }
  }

  // get families the contact is a child of
  if (contact.parents.length) {
    const familiesAsChildren = getFamiliesForChildren(contact.parents)
    // if there aren't any families for this child, we need to create 1 or more
    if (!familiesAsChildren.length) {
      const firstParent = getContactById(contact.parents[0])
      if (contact.parents.length > 1) {
        if (contact.parents.includes(firstParent.spouse)) {
          createFamilyForContact(firstParent)
        } else {
          // TODO: In the unlikely event I have to handle the case where someone has more than two parents...
          createFamilyForContact(firstParent)
          createFamilyForContact(getContactById(contact.parents[1]))
        }
      }
    }
  }
}

exports.getFamiliesForChildren = parents => {
  return parents.reduce((others, parent) => {
    if (others.length && others.parents.includes(parent)) {
      return others
    }
    return [...others, getFamilyForParentId(parent)]
  }, [])
}

exports.getContactById = contactId => {
  return allContacts.find(con => con.id === contactId)
}

exports.createFamilyForContact = contact => {
  const spouse = getSpouseForContact(contact)

  const father = contact.gender === 'M' ? contact : spouse
  const mother = father && father.id === contact.id ? spouse : contact

  const children = spouse
    ? uniq([...contact.children, ...spouse.children])
    : contact.children

  const grandparents = [
    ...getParentsAndTheirSpousesForContact(contact),
    ...getParentsAndTheirSpousesForContact(spouse)
  ]

  const parents = father
    ? mother
      ? [father.id, mother.id]
      : [father.id]
    : mother
      ? [mother.id]
      : []

  const newFam = new Family({
    type: 0,
    id: Math.random()
      .toString(36)
      .substring(7),
    fatherSurname: father ? father.lastName : '',
    motherMaidenName: mother
      ? mother.maidenName
        ? mother.maidenName
        : mother.lastName
      : '',
    parents: parents,
    children,
    grandparents
  })

  const updatedFamilyList = [...allFamilies, newFam]

  fs.writeFileSync(
    `${__dirname}/allFamilies.json`,
    JSON.stringify(updatedFamilyList, null, 2)
  )

  return newFam
}

exports.getAllRelativesForContact = contactId => {
  const family = getFamilyForParentId(contactId)
  if (!family) {
    // TODO: handle if is a child or bad data
    return []
  }
  const relatedFamilies = getRelatedFamiliesForFamily(family)
  console.log(relatedFamilies)

  return uniq(
    relatedFamilies.reduce(
      (relatives, fam) => [...relatives, ...fam.parents, ...fam.children],
      []
    )
  )
}

const getRelatedFamiliesForFamily = family => {
  const relatedFamilies = [
    ...getFamiliesForContactIds(family.children),
    ...getFamiliesForContactIds(family.grandparents)
  ]
  return relatedFamilies.length
    ? relatedFamilies.reduce(
        (allRelated, fam) => [
          ...allRelated,
          ...getRelatedFamiliesForFamily(fam)
        ],
        [...relatedFamilies]
      )
    : []
}

const getFamiliesForContactIds = contactIds => {
  return contactIds.length
    ? allFamilies.filter(fam =>
        fam.parents.some(par => contactIds.includes(par))
      )
    : []
}

const getFamilyForParentId = parentId => {
  return allFamilies.find(fam => fam.parents.includes(parentId))
}

const getSpouseForContact = contact => {
  return contact.spouse
    ? allContacts.find(con => con.id === contact.spouse)
    : null
}

const getParentsAndTheirSpousesForContact = contact => {
  const allParents = contact
    ? contact.parents.reduce((parents, parentId, i, parentIds) => {
        const parent = allContacts.find(con => con.id === parentId)
        return [...parents, parentId, parent.spouse]
      }, [])
    : []
  return uniq(allParents.filter(parentId => Boolean(parentId)))
}

// step 2: traverse families to highest

// step 3: traverse families to children

exports.getRelativesForContact = getRelativesForContact
