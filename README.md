# Rolo

The family contact app

## Features

- Shared list of contacts anyone in that 'group' can use
- Users are associated with at least one contact in the group
- Users can define their own 'tags'
- ~~Users can submit edits for group admins to approve~~
- Users can update their own contacts
- Users can select multiple contacts/households to create mass email or mailing list (tag, which is exported as spreadsheet)
- Offline first, without editing

## TODO

- [x] Can upload CSV to Google and it is converted to JSON
- [ ] Users log in with google, email, or phone number
- [x] On login, load all families and all contacts in those families
- [x] Security rules prevent adding or editing contacts from families you aren't a part of

## Data Model

- users
  - $userId
    - contactId
    - contacts (snapshot via functions)
      - $contactId
    - families
      - $familyId
    - tags
      - $tag
        - $contactId
- families (one of more parent with their children)
  - $familyId
    - name
    
    - admins
      - $userId
- contacts
  - $contactId
    - firstName
    - lastName
    - parents
      - $contactId
    - spouse
      - $contactId
    - children
      - $contactId
    - ancestors
      - $ancestorId (family, sorted youngest to eldest)
    - addresses
      - $addressId: label
    - phoneNumbers:
      - $number: label
    - birthday
    - email
    - gender
    - dateOfDeath
- addresses
  - $addressId
    - label
    - street1
    - street2
    - city
    - state
    - zip

## Future State

 - Secure clientside updates
 - Total offline first
 - React Native