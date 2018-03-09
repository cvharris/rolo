import contactListReducer, { initialState } from "./contactListReducer";
import Contact from "../lib/Contact";

it('Adds contacts to the contact list', () => {
  const newContact = new Contact({ firstName: 'Derp' })

  expect(contactListReducer(initialState, { type: 'ADD_CONTACT', payload: newContact })).toHaveLength(1)
})

it('handles unknown actions', () => {
  expect(contactListReducer(initialState, { type: 'DERP' })).toBe(initialState)
})

it('Handles setting initial state', () => {
  expect(contactListReducer(undefined, {})).toHaveLength(0)
})