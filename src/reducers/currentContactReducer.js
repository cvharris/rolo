import {
  ADD_CONTACT,
  SET_CURRENT_CONTACT,
  UPDATE_CURRENT_CONTACT
} from '../config/constants'
import Contact from '../lib/Contact'

export const mapRefToTypeAheadOption = (doc, allContactsById) => {
  if (!doc) {
    return {
      value: '',
      label: ''
    }
  }

  const contact = allContactsById[doc.id]
  if (!contact) {
    // TODO: This is a bug! The mapping of relatives should have added this contact!
    return {
      value: doc.id,
      label: 'Not Found!'
    }
  }
  return {
    value: doc.id,
    label: `${contact.firstName} ${contact.lastName}`
  }
}
// Initial State
const initialState = new Contact({})

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_CONTACT:
      return {
        ...state,
        ...action.contact
      }
    case ADD_CONTACT:
      return new Contact({})
    case SET_CURRENT_CONTACT:
      const editableContact = {
        ...action.contact,
        spouse: mapRefToTypeAheadOption(
          action.contact.spouse,
          action.allContacts
        ),
        parents: action.contact.parents.map(parent =>
          mapRefToTypeAheadOption(parent, action.allContacts)
        ),
        children: action.contact.children.map(child =>
          mapRefToTypeAheadOption(child, action.allContacts)
        )
      }
      return new Contact(editableContact)
    default:
      return state
  }
}
