export default function(normalized) {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(
      JSON.stringify(
        normalized.result.contacts.map(cId => {
          const contact = normalized.entities.contacts[cId]
          return {
            ...contact,
            spouse: contact.spouse ? contact.spouse.id : null,
            parents: contact.parents.length
              ? contact.parents.map(par => par.id)
              : [],
            children: contact.children.length
              ? contact.children.map(child => child.id)
              : []
          }
        })
      )
    )
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', 'data.json')
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
