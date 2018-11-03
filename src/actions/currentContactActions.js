import {
  RESET_CURRENT_CONTACT,
  UPDATE_CURRENT_CONTACT
} from '../config/constants'

export const updateCurrentContact = contact => ({
  type: UPDATE_CURRENT_CONTACT,
  contact
})

export const resetCurrentContact = () => ({
  type: RESET_CURRENT_CONTACT
})
