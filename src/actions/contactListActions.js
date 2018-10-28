export const addContact = newContact => ({
  type: 'ADD_CONTACT',
  payload: newContact
})

export const updateContact = contact => ({
  type: 'UPDATE_CONTACT',
  payload: contact
})

export const removeContact = contact => ({
  type: 'REMOVE_CONTACT',
  payload: contact
})
