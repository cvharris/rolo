export const updateCurrentContact = contact => ({
  type: 'UPDATE_CURRENT_CONTACT',
  payload: contact
})

export const resetCurrentContact = () => ({
  type: 'RESET_CURRENT_CONTACT'
})
