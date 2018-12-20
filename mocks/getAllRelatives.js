const ancestorsForContacts = require('./ancestorsForContacts')
const descendantsForRoots = require('./descendantsForRoots')

module.exports = function(contact) {
  const roots = ancestorsForContacts([contact])
  return descendantsForRoots(roots)
}
