import { ADD_CONTACT } from '../config/constants'
import Contact from '../lib/Contact'
import contactsReducer, { initialState } from './contactsReducer'

it('Adds contacts to the contact list', () => {
  const newContact = new Contact({ firstName: 'Derp' })

  expect(
    contactsReducer(initialState, {
      type: ADD_CONTACT,
      payload: newContact
    })
  ).toHaveLength(1)
})

it('handles unknown actions', () => {
  expect(contactsReducer(initialState, { type: 'DERP' })).toBe(initialState)
})

it('Handles setting initial state', () => {
  expect(contactsReducer(undefined, {})).toHaveLength(0)
})
