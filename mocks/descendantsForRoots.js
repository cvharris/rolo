const uniq = require('lodash/uniq')
const { getContactById } = require('./utils')

module.exports = function(roots) {
  let checked = []

  const accumulateDescendants = function(family, contact) {
    if (checked.includes(contact.id)) {
      return family
    }

    checked = [...checked, contact.id]

    const children = contact.children.map(childId => getContactById(childId))

    if (!contact.spouse) {
      return [...family, ...contact.children, ...traverse(children)]
    } else {
      const spouse = getContactById(contact.spouse)
      return [
        ...family,
        ...contact.children,
        ...traverse([spouse, ...children])
      ]
    }
  }

  const traverse = function(branches, init = []) {
    return branches.reduce(accumulateDescendants, init)
  }

  const initialIds = roots.map(root => root.id)

  const result = traverse(roots, initialIds)

  // console.log(
  //   result.reduce(
  //     (dup, conId, i, arr) =>
  //       arr.indexOf(conId) !== i
  //         ? [...dup, getContactById(conId).firstName]
  //         : dup,
  //     []
  //   )
  // )

  return uniq(result)
}
