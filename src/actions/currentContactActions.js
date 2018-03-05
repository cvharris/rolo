export const updateContactName = (name) => ({ type: 'UPDATE_CONTACT_NAME', payload: name })
export const addContact = (newContact) => ({ type: 'ADD_CONTACT', payload: newContact })
export const removeContact = (contact) => ({ type: 'REMOVE_CONTACT', payload: contact })