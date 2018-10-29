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

- [ ] Users log in with google, email, or phone number
- [ ] On login, load all families and all contacts in those families
- [ ] Security rules prevent adding or editing contacts from families you aren't a part of

## Data Model

- users
  - $userId
    - contactId
    - families
      - $familyId
    - tags
      - $tag
        - $contactId
- families
  - $familyId
    - name
    - contacts
      - $contactId
    - ancestors
      - $ancestorId (family, sorted youngest to eldest)
    - admins
      - $userId
- contacts
  - $contactId
    - firstName
    - lastName
    - relationships
      - $contactId: label
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
    - street1
    - street2
    - city
    - state
    - zip

## Future State

 - Secure clientside updates
 - Total offline first
 - React Native