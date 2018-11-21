import uniq from 'lodash/uniq'
import allContacts from './allContacts.json'

const getSpouseParents = (contact, parents) => {
  let newParents = [...parents]
  if (contact.parents && !!contact.parents.length) {
    newParents = contact.parents.reduce((allParents, parentId) => {
      const parent = allContacts.find(par => par.id === parentId)
      return [...getParents(parent, allParents)]
    }, newParents)
  } else {
    newParents = [...parents, contact.id]
  }

  return uniq(newParents)
}

const getParents = (contact, parents) => {
  let newParents = [...parents]
  if (contact.parents && !!contact.parents.length) {
    newParents = contact.parents.reduce((allParents, parentId) => {
      const parent = allContacts.find(par => par.id === parentId)
      return [...getParents(parent, allParents)]
    }, newParents)
  } else {
    newParents = [...parents, contact.id]
  }

  if (!!contact.spouse) {
    const spouse = allContacts.find(con => con.id === contact.spouse)
    newParents = [...newParents, ...getSpouseParents(spouse, newParents)]
  }

  return uniq(newParents)
}

const getChildren = (contact, relatives) => {
  let newRelatives = [...relatives]
  if (contact.children && !!contact.children.length) {
    newRelatives = contact.children.reduce((allRelatives, childId) => {
      newRelatives = [...allRelatives, childId]
      const child = allContacts.find(ch => ch.id === childId)
      return [...getChildren(child, newRelatives)]
    }, newRelatives)
  }

  if (!!contact.spouse) {
    const spouse = allContacts.find(con => con.id === contact.spouse)
    newRelatives = [
      ...newRelatives,
      contact.spouse,
      ...getSpouseChildren(spouse, newRelatives)
    ]
  }

  return uniq(newRelatives)
}

const getSpouseChildren = (contact, relatives) => {
  let newRelatives = [...relatives]
  if (contact.children && !!contact.children.length) {
    newRelatives = contact.children.reduce((allRelatives, childId) => {
      newRelatives = [...allRelatives, childId]
      const child = allContacts.find(ch => ch.id === childId)
      return [...getChildren(child, newRelatives)]
    }, newRelatives)
  }

  return uniq(newRelatives)
}

export default contact => {
  let relatives = [] // array of DocumentReferences
  let parents = []

  parents = getParents(contact, parents)

  if (!!parents.length) {
    relatives = parents.reduce((allRelatives, parentId) => {
      const parent = allContacts.find(con => con.id === parentId)
      return getChildren(parent, allRelatives)
    }, parents)
  } else if (contact.children && !!contact.children.length) {
    relatives = contact.children.reduce((allRelatives, childId) => {
      const newRelatives = [...allRelatives, childId]
      const child = allContacts.find(con => con.id === childId)
      return getChildren(child, newRelatives)
    }, relatives)
  } else {
    relatives = [contact.id]
  }

  const namedResults = uniq(relatives).map(relId => {
    const contact = allContacts.find(con => con.id === relId)
    return `${contact.firstName} ${contact.lastName}`
  })

  // console.info(namedResults)

  return relatives
}
