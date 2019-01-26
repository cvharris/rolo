const { getContactById } = require('./utils')

module.exports = function(contacts) {
  let checked = []

  const ancesotrsForContact = function(ancestors, contact) {
    // exit recursion fast
    if (checked.indexOf(contact.id) > -1) {
      return ancestors
    }

    // recusion safety check
    checked = [...checked, contact.id]

    if (!contact.parents.length) {
      if (!contact.spouse || checked.indexOf(contact.spouse) > -1) {
        return [...ancestors, contact]
      } else {
        const spouse = getContactById(contact.spouse)
        return [...ancestors, contact, ...traverse([spouse])]
      }
    }

    // get the parents
    const parents = contact.parents.map(parentId => getContactById(parentId))

    // If no spouse, just check the parents
    // Otherwise, get the spouse and check
    if (!contact.spouse && checked.indexOf(contact.spouse) === -1) {
      return [...ancestors, ...traverse(parents)]
    } else {
      const spouse = getContactById(contact.spouse)
      return [...ancestors, ...traverse([...parents, spouse])]
    }
  }

  const traverse = function(branches) {
    return branches.reduce(ancesotrsForContact, [])
  }

  return traverse(contacts)
}
